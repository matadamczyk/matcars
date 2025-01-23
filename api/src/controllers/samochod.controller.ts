import { Request, Response } from 'express';

import { AppDataSource } from '../config/database';
import { Samochod } from '../entities/Samochod';

export const createSamochod = async (req: Request, res: Response): Promise<void> => {
    try {
        const { marka, model, rok_produkcji, cena_za_dzien, zdjecie } = req.body;
        const samochodRepository = AppDataSource.getRepository(Samochod);

        const samochod = samochodRepository.create({
            marka,
            model,
            rok_produkcji,
            cena_za_dzien,
            zdjecie,
            status: 'dostepny'
        });

        await samochodRepository.save(samochod);
        res.status(201).json(samochod);
    } catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const getSamochody = async (req: Request, res: Response): Promise<void> => {
    try {
        const samochodRepository = AppDataSource.getRepository(Samochod);
        const samochody = await samochodRepository.find({
            relations: ['wypozyczenia']
        });
        res.json(samochody);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const getSamochod = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid car ID" });
            return;
        }

        const samochodRepository = AppDataSource.getRepository(Samochod);
        const samochod = await samochodRepository.findOne({
            where: { id_samochodu: id },
            relations: ['wypozyczenia']
        });

        if (!samochod) {
            res.status(404).json({ message: "Samochód nie znaleziony" });
            return;
        }

        res.json(samochod);
    } catch (error) {
        console.error("Error fetching car:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const updateSamochod = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid car ID" });
            return;
        }

        const samochodRepository = AppDataSource.getRepository(Samochod);
        const samochod = await samochodRepository.findOneBy({ 
            id_samochodu: id 
        });

        if (!samochod) {
            res.status(404).json({ message: "Samochód nie znaleziony" });
            return;
        }

        samochodRepository.merge(samochod, req.body);
        const results = await samochodRepository.save(samochod);
        res.json(results);
    } catch (error) {
        console.error("Error updating car:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const deleteSamochod = async (req: Request, res: Response): Promise<void> => {
    try {
        const samochodRepository = AppDataSource.getRepository(Samochod);
        const result = await samochodRepository.delete(req.params.id);
        
        if (result.affected === 0) {
            res.status(404).json({ message: "Samochód nie znaleziony" });
            return;
        }
        
        res.json({ message: "Samochód został usunięty" });
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const getFilteredSamochody = async (req: Request, res: Response): Promise<void> => {
    try {
        const repo = AppDataSource.getRepository(Samochod);
        const { query } = req.query;
        const samochody = await repo
            .createQueryBuilder("samochod")
            .where("samochod.model LIKE :query OR samochod.marka LIKE :query", { query: `%${query}%` })
            .getMany();
        res.json(samochody);
    } catch (error) {
        console.error("Error fetching filtered cars:", error);
        res.status(500).json({ message: "Błąd serwera", error });
    }
};

export const sortSamochody = async (req: Request, res: Response): Promise<void> => {
  try {
    const repo = AppDataSource.getRepository(Samochod);
    const { sortBy, order } = req.query;

    console.log("Received sortBy:", sortBy, "order:", order);

    if (!sortBy || !order) {
      console.error("Missing sortBy or order parameter");
      res.status(400).json({ message: "Invalid sorting parameters" });
      return;
    }

    const validSortFields = ["cena_za_dzien", "marka", "model", "rok_produkcji"];
    const validOrderValues = ["asc", "desc"];

    if (!validSortFields.includes(sortBy as string)) {
      console.error("Invalid sortBy parameter:", sortBy);
      res.status(400).json({ message: "Invalid sorting parameters" });
      return;
    }

    if (!validOrderValues.includes(order as string)) {
      console.error("Invalid order parameter:", order);
      res.status(400).json({ message: "Invalid sorting parameters" });
      return;
    }

    const samochody = await repo
      .createQueryBuilder("samochod")
      .orderBy(`samochod.${sortBy}`, order === 'desc' ? 'DESC' : 'ASC')
      .getMany();

    res.json(samochody);
  } catch (error) {
    console.error("Error fetching sorted cars:", error); 
    res.status(500).json({ message: "Błąd serwera", error });
  }
};