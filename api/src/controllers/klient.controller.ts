import { Request, Response } from "express";

import { AppDataSource } from "../config/database";
import { Klient } from "../entities/Klient";

export const getKlienci = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Klient);
  const klienci = await repo.find();
  res.json(klienci);
};