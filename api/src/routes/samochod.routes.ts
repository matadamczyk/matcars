import { createSamochod, deleteSamochod, getFilteredSamochody, getSamochod, getSamochody, updateSamochod } from "../controllers/samochod.controller";

import { Router } from "express";

const router = Router();

router.get("/", getSamochody);
router.get("/:id", getSamochod);
router.post("/", createSamochod);
router.put("/:id", updateSamochod);
router.delete("/:id", deleteSamochod);
router.get("/search", getFilteredSamochody);

export default router;