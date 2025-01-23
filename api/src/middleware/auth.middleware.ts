import { NextFunction, Request, Response } from 'express';

import { AppDataSource } from '../config/database';
import { RequestHandler } from 'express-serve-static-core';
import { Uzytkownik } from '../entities/Uzytkownik';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: number;
    email: string;
    rola: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Brak tokenu autoryzacji" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key') as JwtPayload;
        req.user = decoded;

        const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
        await uzytkownikRepository.update(
            { id_uzytkownika: decoded.id },
            { last_login: new Date() }
        );

        if (process.env.NODE_ENV !== 'test') {
            await AppDataSource.query(
                "SELECT set_config('app.current_user_id', $1, false)",
                [decoded.id.toString()]
            );
        }

        next();
    } catch (error) {
        res.status(403).json({ message: "Nieprawidłowy token" });
        return;
    }
};

export const checkRole = (roles: string[]): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!req.user) {
            res.status(401).json({ message: "Brak autoryzacji" });
            return;
        }

        const uzytkownikRepository = AppDataSource.getRepository(Uzytkownik);
        const uzytkownik = await uzytkownikRepository.findOne({
            where: { id_uzytkownika: req.user.id },
            relations: ['rola']
        });

        if (!uzytkownik || !roles.includes(uzytkownik.rola.nazwa)) {
            res.status(403).json({ message: "Brak uprawnień" });
            return;
        }

        next();
    };
};