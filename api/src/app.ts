import "reflect-metadata";

import { AppDataSource } from "./config/database";
import cors from "cors";
import express from "express";
import klientRoutes from "./routes/klient.routes";
import samochodRoutes from "./routes/samochod.routes";
import uzytkownikRoutes from "./routes/uzytkownik.routes";
import wypozyczenieRoutes from "./routes/wypozyczenie.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/klienci", klientRoutes);
app.use("/api/samochody", samochodRoutes);
app.use("/api/wypozyczenia", wypozyczenieRoutes);
app.use("/api/uzytkownicy", uzytkownikRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error: unknown) => {
    console.error("Database connection error:", error);
  });

export default app;