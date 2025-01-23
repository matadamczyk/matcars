import { DataSource } from "typeorm";
import { Klient } from "../entities/Klient";
import { Role } from "../entities/Role";
import { Samochod } from "../entities/Samochod";
import { Uzytkownik } from "../entities/Uzytkownik";
import { Wypozyczenie } from "../entities/Wypozyczenie";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + '/../../.env' });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA || 'test',
  synchronize: true,
  logging: true,
  entities: [Klient, Samochod, Uzytkownik, Wypozyczenie, Role],
  migrations: [__dirname, "../migrations/**/*.ts"],
  ssl: {
    rejectUnauthorized: false, 
  },
});