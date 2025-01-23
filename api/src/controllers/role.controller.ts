import { Request, Response } from 'express';

import { AppDataSource } from '../config/database';
import { Role } from '../entities/Role';

export const getRoles = async (req: Request, res: Response): Promise<void> => {
    try {
        const roleRepository = AppDataSource.getRepository(Role);
        const roles = await roleRepository.find();
        res.json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const getRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const roleRepository = AppDataSource.getRepository(Role);
        const role = await roleRepository.findOne({
            where: { id_roli: parseInt(req.params.id) },
            relations: ['uzytkownicy']
        });
        
        if (!role) {
            res.status(404).json({ message: "Rola nie znaleziona" });
            return;
        }
        
        res.json(role);
    } catch (error) {
        console.error("Error fetching role:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};