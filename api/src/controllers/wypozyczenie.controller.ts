import { Request, Response } from "express";

import { AppDataSource } from "../config/database";
import { Wypozyczenie } from "../entities/Wypozyczenie";

export const getWypozyczenia = async (req: Request, res: Response): Promise<void> => {
    try {
        const repo = AppDataSource.getRepository(Wypozyczenie);
        const { email } = req.query;

        let wypozyczenia;
        if (email) {
            wypozyczenia = await repo
                .createQueryBuilder('wypozyczenie')
                .leftJoinAndSelect('wypozyczenie.samochod', 'samochod')
                .leftJoinAndSelect('wypozyczenie.klient', 'klient')
                .where('klient.email = :email', { email })
                .getMany();
        } else {
            wypozyczenia = await repo.find({ 
                relations: ['samochod', 'klient']
            });
        }

        res.json(wypozyczenia);
    } catch (error) {
        console.error('Error fetching wypozyczenia:', error);
        res.status(500).json({ error: 'Failed to fetch rentals' });
    }
};

export const getWypozyczenie = async (req: Request, res: Response): Promise<void> => {
    try {
        const repo = AppDataSource.getRepository(Wypozyczenie);
        const wypozyczenie = await repo.findOne({
            where: { id_wypozyczenia: parseInt(req.params.id) },
            relations: ['samochod', 'klient']
        });

        if (!wypozyczenie) {
            res.status(404).json({ message: "Wypożyczenie nie znalezione" });
            return;
        }

        res.json(wypozyczenie);
    } catch (error) {
        console.error("Error fetching wypozyczenie:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const createWypozyczenie = async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Wypozyczenie);
    const { data_wypozyczenia, data_zwrotu, calkowity_koszt, id_klienta, id_samochodu } = req.body;

    try {
        const wypozyczenie = repo.create({
            data_wypozyczenia,
            data_zwrotu,
            calkowity_koszt,
            status: 'aktywne',
            klient: { id_klienta },
            samochod: { id_samochodu }
        });

        const result = await repo.save(wypozyczenie);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating wypozyczenie:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const updateWypozyczenie = async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Wypozyczenie);
    const wypozyczenie = await repo.findOneBy({ id_wypozyczenia: parseInt(req.params.id) });

    if (wypozyczenie) {
        repo.merge(wypozyczenie, req.body);
        const result = await repo.save(wypozyczenie);
        res.json(result);
    } else {
        res.status(404).json({ message: "Wypożyczenie nie znalezione" });
    }
};

export const deleteWypozyczenie = async (req: Request, res: Response): Promise<void> => {
    const repo = AppDataSource.getRepository(Wypozyczenie);
    const result = await repo.delete(req.params.id);
    
    if (result.affected === 0) {
        res.status(404).json({ message: "Wypożyczenie nie znalezione" });
        return;
    }

    res.json({ message: "Wypożyczenie zostało usunięte" });
};

export const checkAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
        const carId = parseInt(req.params.carId);
        const { startDate, endDate } = req.query;

        const existingRentals = await AppDataSource
            .getRepository(Wypozyczenie)
            .createQueryBuilder("wypozyczenie")
            .where("wypozyczenie.samochod.id_samochodu = :carId", { carId })
            .andWhere(
                "(wypozyczenie.data_wypozyczenia <= :endDate AND wypozyczenie.data_zwrotu >= :startDate)",
                { startDate, endDate }
            )
            .getCount();

        res.json({
            available: existingRentals === 0
        });
    } catch (error) {
        console.error("Error checking availability:", error);
        res.status(500).json({ error: "Failed to check availability" });
    }
};