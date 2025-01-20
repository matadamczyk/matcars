import { createKlient, getKlienci } from "../controllers/klient.controller";

import { Router } from "express";

const router = Router();

router.get("/", getKlienci);
router.post("/", createKlient);

export default router;