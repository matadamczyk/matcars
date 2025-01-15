import { createSamochod, deleteSamochod, getSamochod, getSamochody, updateSamochod } from "../controllers/samochod.controller";

import { Router } from "express";

const router = Router();

router.get("/", getSamochody);
router.get("/:id", getSamochod);
router.post("/", createSamochod);
router.put("/:id", updateSamochod);
router.delete("/:id", deleteSamochod);

export default router;