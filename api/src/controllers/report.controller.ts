import { Request, Response } from 'express';

import { AppDataSource } from '../config/database';

export const getActiveRentals = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await AppDataSource.query('SELECT * FROM test.active_rentals');
        res.json(result);
    } catch (error) {
        console.error("Error fetching active rentals:", error as Error);
        res.status(500).json({ message: "Błąd serwera", error: (error as Error).message });
    }
};

export const getCarAvailability = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await AppDataSource.query('SELECT * FROM test.car_availability');
        res.json(result);
    } catch (error) {
        console.error("Error fetching car availability:", error as Error);
        res.status(500).json({ message: "Błąd serwera", error: (error as Error).message });
    }
};

export const getRentalStatistics = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await AppDataSource.query('SELECT * FROM test.rental_statistics');
        res.json(result);
    } catch (error) {
        console.error("Error fetching rental statistics:", error as Error);
        res.status(500).json({ message: "Błąd serwera", error: (error as Error).message });
    }
};