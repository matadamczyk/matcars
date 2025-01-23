import { Request, Response } from 'express';

import { AppDataSource } from '../config/database';
import { Logi } from '../entities/Logi';

export const getLogs = async (req: Request, res: Response) => {
    try {
        const logs = await AppDataSource.getRepository(Logi).find();
        res.json(logs);
    } catch (error) {
        console.error('Error fetching logs:', (error as Error).message, (error as Error).stack);
        res.status(500).json({ message: 'Error fetching logs', error: (error as Error).message });
    }
};
