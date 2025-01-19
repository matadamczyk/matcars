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

// Configure CORS
app.use(cors({
  origin: "http://localhost:8080", // Adjust this to your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());

// Add CSP headers
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

    // const nowyKlient = repo.create({
    //   imie: "Jan",
    //   nazwisko: "Kowalski",
    //   email: "jan.kowalski@example.com",
    //   telefon: "123456789",
    // });
    // await repo.save(nowyKlient);

    const klienci = await repo.find();
    console.log("Klienci:", klienci);
  })
  .catch((error: unknown) => {
    console.error("Database connection error:", error);
  });

export default app;
