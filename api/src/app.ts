import "reflect-metadata";

import { AppDataSource } from "./config/database";
import { Klient } from "./entities/Klient";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import klientRoutes from "./routes/klient.routes";
import samochodRoutes from "./routes/samochod.routes";
import uzytkownikRoutes from "./routes/uzytkownik.routes";
import wypozyczenieRoutes from "./routes/wypozyczenie.routes";

const app = express();

app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "http://localhost:8080"],
      },
    },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/klienci", klientRoutes);
app.use("/api/samochody", samochodRoutes);
app.use("/api/wypozyczenia", wypozyczenieRoutes);
app.use("/api/uzytkownicy", uzytkownikRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
    console.log(
      "Loaded entities:",
      AppDataSource.entityMetadatas.map((e) => e.name)
    );

    const repo = AppDataSource.getRepository(Klient);

    const klienci = await repo.find();
    console.log("Klienci:", klienci);
  })
  .catch((error: unknown) => {
    console.error("Database connection error:", error);
  });

export default app;
