import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Request, Response } from 'express';

import { AppDataSource } from '../config/database';
import { Klient } from '../entities/Klient';
import { Role } from '../entities/Role';
import { Uzytkownik } from '../entities/Uzytkownik';

export const createUzytkownik = async (req: Request, res: Response): Promise<void> => {
  try {
      const { imie, nazwisko, email, haslo, id_roli } = req.body;
      
      const roleRepository = AppDataSource.getRepository(Role);
      const rola = await roleRepository.findOneBy({ id_roli });
      
      if (!rola) {
          res.status(400).json({ message: "Nieprawidłowa rola" });
          return;
      }

      const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
      const hashedPassword = await bcrypt.hash(haslo, 10);
      
      const uzytkownik = uzytkownikRepository.create({
          imie,
          nazwisko,
          email,
          haslo: hashedPassword,
          rola
      });

      await uzytkownikRepository.save(uzytkownik);
      res.status(201).json(uzytkownik);
  } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const getUzytkownicy = async (req: Request, res: Response): Promise<void> => {
  try {
      const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
      const users = await uzytkownikRepository.find();
      res.json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Błąd serwera" });
  }
};

export const updateUzytkownik = async (req: Request, res: Response): Promise<void> => {
  try {
      const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
      const uzytkownik = await uzytkownikRepository.findOneBy({ 
          id_uzytkownika: parseInt(req.params.id) 
      });

      if (!uzytkownik) {
          res.status(404).json({ message: "Użytkownik nie znaleziony" });
          return;
      }

      if (req.body.haslo) {
          req.body.haslo = await bcrypt.hash(req.body.haslo, 10);
      }

      if (req.body.id_roli) {
          const roleRepository = AppDataSource.getRepository(Role);
          const rola = await roleRepository.findOneBy({ id_roli: req.body.id_roli });
          if (!rola) {
              res.status(400).json({ message: "Nieprawidłowa rola" });
              return;
          }
          req.body.rola = rola;
      }

      uzytkownikRepository.merge(uzytkownik, req.body);
      const results = await uzytkownikRepository.save(uzytkownik);
      res.json(results);
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const deleteUzytkownik = async (req: Request, res: Response) => {
    try {
        const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
        const results = await uzytkownikRepository.delete(req.params.id);
        res.json(results);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const updateLastLogin = async (req: Request, res: Response): Promise<void> => {
  try {
      const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
      const uzytkownik = await uzytkownikRepository.findOneBy({ 
          id_uzytkownika: parseInt(req.params.id) 
      });

      if (!uzytkownik) {
          res.status(404).json({ message: "Użytkownik nie znaleziony" });
          return;
      }

      uzytkownik.last_login = new Date();
      await uzytkownikRepository.save(uzytkownik);
      res.json({ message: "Last login updated successfully" });
  } catch (error) {
      console.error("Error updating last login:", error);
      res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
      if (!req.user) {
          res.status(401).json({ message: "Brak autoryzacji" });
          return;
      }

      const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
      const uzytkownik = await uzytkownikRepository.findOne({
          where: { id_uzytkownika: req.user.id },
          relations: ['rola', 'klient']
      });

      if (!uzytkownik) {
          res.status(404).json({ message: "Użytkownik nie znaleziony" });
          return;
      }

      res.json(uzytkownik);
  } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const getUzytkownik = async (req: Request, res: Response): Promise<void> => {
  try {
      const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
      const uzytkownik = await uzytkownikRepository.findOne({
          where: { id_uzytkownika: parseInt(req.params.id) },
          relations: ['rola', 'klient', 'utworzone_wypozyczenia']
      });

      if (!uzytkownik) {
          res.status(404).json({ message: "Użytkownik nie znaleziony" });
          return;
      }

      res.json(uzytkownik);
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const loginUzytkownik = async (req: Request, res: Response): Promise<void> => {
  try {
      const { email, haslo } = req.body;
      const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
      
      const uzytkownik = await uzytkownikRepository.findOne({
          where: { email },
          relations: ['rola']
      });

      if (!uzytkownik) {
          res.status(401).json({ message: "Nieprawidłowy email lub hasło" });
          return;
      }

      const isValidPassword = await bcrypt.compare(haslo, uzytkownik.haslo);
      if (!isValidPassword) {
          res.status(401).json({ message: "Nieprawidłowy email lub hasło" });
          return;
      }

      // Aktualizacja last_login
      uzytkownik.last_login = new Date();
      await uzytkownikRepository.save(uzytkownik);

      const token = jwt.sign(
          { 
              id: uzytkownik.id_uzytkownika, 
              email: uzytkownik.email,
              rola: uzytkownik.rola.nazwa 
          },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '24h' }
      );

      res.json({ 
          token,
          user: {
              id: uzytkownik.id_uzytkownika,
              email: uzytkownik.email,
              imie: uzytkownik.imie,
              nazwisko: uzytkownik.nazwisko,
              rola: uzytkownik.rola.nazwa
          }
      });
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const logoutUzytkownik = async (req: Request, res: Response): Promise<void> => {
  try {
      // W przypadku JWT, możemy tylko poinformować klienta o sukcesie
      // Rzeczywiste wylogowanie powinno być obsłużone po stronie klienta
      res.json({ message: "Wylogowano pomyślnie" });
  } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const registerUzytkownik = async (req: Request, res: Response): Promise<void> => {
  try {
      const { imie, nazwisko, email, haslo } = req.body;
      const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
      const roleRepository = AppDataSource.getRepository(Role);

      // Sprawdź czy użytkownik już istnieje
      const existingUser = await uzytkownikRepository.findOne({ where: { email } });
      if (existingUser) {
          res.status(400).json({ message: "Użytkownik z tym emailem już istnieje" });
          return;
      }

      // Pobierz rolę 'klient'
      const klientRole = await roleRepository.findOne({ 
          where: { nazwa: 'klient' }
      });

      if (!klientRole) {
          res.status(500).json({ message: "Błąd konfiguracji - brak roli 'klient'" });
          return;
      }

      const hashedPassword = await bcrypt.hash(haslo, 10);
      
      const uzytkownik = uzytkownikRepository.create({
          imie,
          nazwisko,
          email,
          haslo: hashedPassword,
          rola: klientRole
      });

      await uzytkownikRepository.save(uzytkownik);

      const klientRepository = AppDataSource.getRepository(Klient);
      const klient = klientRepository.create({
          imie,
          nazwisko,
          email,
          uzytkownik
      });

      await klientRepository.save(klient);

      res.status(201).json({ 
          message: "Zarejestrowano pomyślnie",
          user: {
              id: uzytkownik.id_uzytkownika,
              email: uzytkownik.email,
              imie: uzytkownik.imie,
              nazwisko: uzytkownik.nazwisko,
              rola: klientRole.nazwa
          }
      });
  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Błąd serwera", error });
  }
};