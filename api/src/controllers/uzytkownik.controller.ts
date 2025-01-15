import { Request, Response } from "express";

import { AppDataSource } from "../config/database";
import { Uzytkownik } from "../entities/Uzytkownik";

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