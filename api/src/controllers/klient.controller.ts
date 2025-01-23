import { Request, Response } from 'express';

import { AppDataSource } from '../config/database';
import { Klient } from '../entities/Klient';
import { Uzytkownik } from '../entities/Uzytkownik';

export const createKlient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { imie, nazwisko, email, telefon, id_uzytkownika } = req.body;
        
        const klientRepository = AppDataSource.getRepository(Klient);
        const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);

        // Sprawdź czy użytkownik istnieje
        const uzytkownik = await uzytkownikRepository.findOneBy({ id_uzytkownika });
        if (!uzytkownik) {
            res.status(400).json({ message: "Użytkownik nie istnieje" });
            return;
        }

        const klient = klientRepository.create({
            imie,
            nazwisko,
            email,
            telefon,
            uzytkownik
        });

        await klientRepository.save(klient);
        res.status(201).json(klient);
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const getKlienci = async (req: Request, res: Response) => {
    try {
        const klientRepository = AppDataSource.getRepository(Klient);
        const klienci = await klientRepository.find({
            relations: ['uzytkownik', 'wypozyczenia']
        });
        res.json(klienci);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const getKlient = async (req: Request, res: Response): Promise<void> => {
    try {
        const klientRepository = AppDataSource.getRepository(Klient);
        const klient = await klientRepository.findOne({
            where: { id_klienta: parseInt(req.params.id) },
            relations: ['uzytkownik', 'wypozyczenia']
        });

        if (!klient) {
            res.status(404).json({ message: "Klient nie znaleziony" });
            return;
        }

        res.json(klient);
    } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const updateKlient = async (req: Request, res: Response): Promise<void> => {
    try {
        const klientRepository = AppDataSource.getRepository(Klient);
        const klient = await klientRepository.findOneBy({ 
            id_klienta: parseInt(req.params.id) 
        });

        if (!klient) {
            res.status(404).json({ message: "Klient nie znaleziony" });
            return;
        }

        if (req.body.id_uzytkownika) {
            const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
            const uzytkownik = await uzytkownikRepository.findOneBy({ 
                id_uzytkownika: req.body.id_uzytkownika 
            });
            if (!uzytkownik) {
                res.status(400).json({ message: "Użytkownik nie istnieje" });
                return;
            }
            req.body.uzytkownik = uzytkownik;
        }

        klientRepository.merge(klient, req.body);
        const results = await klientRepository.save(klient);
        res.json(results);
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const deleteKlient = async (req: Request, res: Response): Promise<void> => {
    try {
        const klientRepository = AppDataSource.getRepository(Klient);
        const results = await klientRepository.delete(req.params.id);
        res.json(results);
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};