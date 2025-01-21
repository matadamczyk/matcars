import { Request, Response } from "express";

import { AppDataSource } from "../config/database";
import { Klient } from "../entities/Klient";
import { Wypozyczenie } from "../entities/Wypozyczenie";

export const getWypozyczenia = async (req: Request, res: Response) => {
  try {
    const repo = AppDataSource.getRepository(Wypozyczenie);
    const { email } = req.query;

    let wypozyczenia;
    if (email) {
      wypozyczenia = await repo
        .createQueryBuilder('wypozyczenie')
        .leftJoinAndSelect('wypozyczenie.samochod', 'samochod')
        .leftJoinAndSelect('wypozyczenie.klient', 'klient')
        .where('klient.email = :email', { email })
        .getMany();
    } else {
      wypozyczenia = await repo.find({ 
        relations: ['samochod', 'klient']
      });
    }

    res.json(wypozyczenia);
  } catch (error) {
    console.error('Error fetching wypozyczenia:', error);
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
};

export const getWypozyczenie = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Wypozyczenie);
  const wypozyczenie = await repo.findOneBy({ id_wypozyczenia: parseInt(req.params.id) });
  res.json(wypozyczenie);
};

export const createWypozyczenie = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Wypozyczenie);
  const { data_wypozyczenia, data_zwrotu, calkowity_koszt, klient, samochod } = req.body;

  try {
    const wypozyczenie = repo.create({
      data_wypozyczenia,
      data_zwrotu,
      calkowity_koszt,
      klient,
      samochod
    });

    const result = await repo.save(wypozyczenie);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating wypozyczenie:", error);
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

export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const carId = parseInt(req.params.carId);
    const { startDate, endDate } = req.query;

    const existingRentals = await AppDataSource
      .getRepository(Wypozyczenie)
      .createQueryBuilder("wypozyczenie")
      .where("wypozyczenie.samochod.id_samochodu = :carId", { carId })
      .andWhere(
        "(wypozyczenie.data_wypozyczenia <= :endDate AND wypozyczenie.data_zwrotu >= :startDate)",
        { startDate, endDate }
      )
      .getCount();

    res.json({
      available: existingRentals === 0
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Failed to check availability" });
  }
};