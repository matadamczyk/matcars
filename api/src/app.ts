import "reflect-metadata";

import { AppDataSource } from "./config/database";
import express from "express";
import klientRoutes from "./routes/klient.routes";

const app = express();
app.use(express.json());
app.use("/api/klienci", klientRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

export default app;