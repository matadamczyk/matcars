import { authenticateToken, checkRole } from '../middleware/auth.middleware';
import {
    checkAvailability,
    createWypozyczenie,
    deleteWypozyczenie,
    getWypozyczenia,
    getWypozyczenie,
    updateWypozyczenie
} from "../controllers/wypozyczenie.controller";

import { Router } from "express";

const router = Router();

router.get("/", getWypozyczenia);
router.get("/:id", getWypozyczenie);
router.get("/availability/:carId", checkAvailability);
router.delete("/:id", authenticateToken, deleteWypozyczenie);

router.post("/", authenticateToken, createWypozyczenie); 
router.put("/:id", authenticateToken, checkRole(['admin']), updateWypozyczenie);

export default router;