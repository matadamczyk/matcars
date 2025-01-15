import { Request, Response } from "express";

import { AppDataSource } from "../config/database";
import { Samochod } from "../entities/Samochod";

export const getSamochody = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Samochod);
  const samochody = await repo.find();
  res.json(samochody);
};

export const getSamochod = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Samochod);
  const samochod = await repo.findOneBy({ id_samochodu: parseInt(req.params.id) });
  res.json(samochod);
};

export const createSamochod = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Samochod);
  const samochod = repo.create(req.body);
  const result = await repo.save(samochod);
  res.json(result);
};

export const updateSamochod = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Samochod);
  const samochod = await repo.findOneBy({ id_samochodu: parseInt(req.params.id) });
  if (samochod) {
    repo.merge(samochod, req.body);
    const result = await repo.save(samochod);
    res.json(result);
  } else {
    res.status(404).json({ message: "Samochod not found" });
  }
};

export const deleteSamochod = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Samochod);
  const result = await repo.delete(req.params.id);
  res.json(result);
};