import { Request, Response } from "express";

import { AppDataSource } from "../config/database";
import { Klient } from "../entities/Klient";
import { Wypozyczenie } from "../entities/Wypozyczenie";

export const getWypozyczenia = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Wypozyczenie);
  const wypozyczenia = await repo.find({ relations: ["id_klienta", "id_samochodu"] });
  res.json(wypozyczenia);
};

export const getWypozyczenie = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Wypozyczenie);
  const wypozyczenie = await repo.findOneBy({ id_wypozyczenia: parseInt(req.params.id) });
  res.json(wypozyczenie);
};

export const createWypozyczenie = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Wypozyczenie);
  const klientRepo = AppDataSource.getRepository(Klient);

  const { imie, nazwisko, email, telefon } = req.body;

  let klient = await klientRepo.findOneBy({ email });
  if (!klient) {
    klient = klientRepo.create({ imie, nazwisko, email, telefon });
    await klientRepo.save(klient);
  }

  const wypozyczenie = repo.create({
    ...req.body,
    klient: klient,
  });

  try {
    const result = await repo.save(wypozyczenie);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error: error });
  }
};

export const updateWypozyczenie = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Wypozyczenie);
  const wypozyczenie = await repo.findOneBy({ id_wypozyczenia: parseInt(req.params.id) });
  if (wypozyczenie) {
    repo.merge(wypozyczenie, req.body);
    const result = await repo.save(wypozyczenie);
    res.json(result);
  } else {
    res.status(404).json({ message: "Wypozyczenie not found" });
  }
};

export const deleteWypozyczenie = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Wypozyczenie);
  const result = await repo.delete(req.params.id);
  res.json(result);
};