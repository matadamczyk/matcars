import { Request, Response } from "express";

import { AppDataSource } from "../config/database";
import { Samochod } from "../entities/Samochod";

export const getSamochody = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Samochod);
  const { sort } = req.query;
  let order = {};

  switch (sort) {
    case "price_asc":
      order = { cena_za_dzien: "ASC" };
      break;
    case "price_desc":
      order = { cena_za_dzien: "DESC" };
      break;
    case "name_asc":
      order = { marka: "ASC", model: "ASC" };
      break;
    case "name_desc":
      order = { marka: "DESC", model: "DESC" };
      break;
    case "year_asc":
      order = { rok_produkcji: "ASC" };
      break;
    case "year_desc":
      order = { rok_produkcji: "DESC" };
      break;
    default:
      order = {};
  }

  const samochody = await repo.find({ order });
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

export const getFilteredSamochody = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Samochod);
  const { query } = req.query;
  const samochody = await repo
    .createQueryBuilder("samochod")
    .where("samochod.model LIKE :query OR samochod.marka LIKE :query", { query: `%${query}%` })
    .getMany();
  res.json(samochody);
};