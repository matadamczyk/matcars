import { Router } from "express";
import { getKlienci } from "../controllers/klient.controller";

const router = Router();

router.get("/", getKlienci);

export default router;