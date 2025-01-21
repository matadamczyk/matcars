import { checkAvailability, createWypozyczenie, deleteWypozyczenie, getWypozyczenia, getWypozyczenie, updateWypozyczenie } from "../controllers/wypozyczenie.controller";

import { Router } from "express";

const router = Router();

router.get("/", getWypozyczenia);
router.get("/availability/:carId", checkAvailability);
router.get("/:id", getWypozyczenie);
router.post("/", createWypozyczenie);
router.put("/:id", updateWypozyczenie);
router.delete("/:id", deleteWypozyczenie);

export default router;