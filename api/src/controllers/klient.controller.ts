import { Request, Response } from "express";

import { AppDataSource } from "../config/database";
import { Klient } from "../entities/Klient";

export const getKlienci = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Klient);
  const klienci = await repo.find();
  res.json(klienci);
};

export const createKlient = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Klient);
  const { imie, nazwisko, email, telefon } = req.body;
  const klient = repo.create({ imie, nazwisko, email, telefon });
  try {
    const result = await repo.save(klient);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error: error });
  }
};