import { authenticateToken, checkRole } from '../middleware/auth';
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

router.post("/", authenticateToken, checkRole(['admin']), createWypozyczenie);
router.put("/:id", authenticateToken, checkRole(['admin']), updateWypozyczenie);
router.delete("/:id", authenticateToken, checkRole(['admin']), deleteWypozyczenie);

export default router;