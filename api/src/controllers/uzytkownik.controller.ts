import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { AppDataSource } from "../config/database";
import { Uzytkownik } from "../entities/Uzytkownik";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUzytkownicy = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Uzytkownik);
  const uzytkownicy = await repo.find();
  res.json(uzytkownicy);
};

export const getUzytkownik = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Uzytkownik);
  const uzytkownik = await repo.findOneBy({ id_uzytkownika: parseInt(req.params.id) });
  res.json(uzytkownik);
};

export const createUzytkownik = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Uzytkownik);
  const uzytkownik = repo.create(req.body);
  const result = await repo.save(uzytkownik);
  res.json(result);
};

export const updateUzytkownik = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Uzytkownik);
  const uzytkownik = await repo.findOneBy({ id_uzytkownika: parseInt(req.params.id) });
  if (uzytkownik) {
    repo.merge(uzytkownik, req.body);
    const result = await repo.save(uzytkownik);
    res.json(result);
  } else {
    res.status(404).json({ message: "Uzytkownik not found" });
  }
};

export const deleteUzytkownik = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Uzytkownik);
  const result = await repo.delete(req.params.id);
  res.json(result);
};

export const registerUzytkownik = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { imie, nazwisko, email, haslo } = req.body;
  const repo = AppDataSource.getRepository(Uzytkownik);

  try {
    const existingUser = await repo.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email jest już zajęty" });
      return 
    }

    const hashedPassword = await bcrypt.hash(haslo, 10);
    const newUser = repo.create({ imie, nazwisko, email, haslo: hashedPassword });
    await repo.save(newUser);

    res.status(201).json({ message: "Rejestracja zakończona sukcesem" });
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera", error: err });
  }
};

export const loginUzytkownik = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return 
  }

  const { email, haslo } = req.body;
  const repo = AppDataSource.getRepository(Uzytkownik);

  try {
    const user = await repo.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Nieprawidłowy email lub hasło" });
      return 
    }

    const isMatch = await bcrypt.compare(haslo, user.haslo);
    if (!isMatch) {
      res.status(400).json({ message: "Nieprawidłowy email lub hasło" });
      return 
    }

    const token = jwt.sign({ id: user.id_uzytkownika, rola: user.rola }, "SECRET_KEY", { expiresIn: "1h" });
    res.status(200).json({ token, rola: user.rola, message: "Zalogowano pomyślnie" });
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera", error: err });
  }
};

export const logoutUzytkownik = (req: Request, res: Response): void => {
  res.status(200).json({ message: "Logged out successfully" });
};