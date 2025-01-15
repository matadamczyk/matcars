import { createUzytkownik, deleteUzytkownik, getUzytkownicy, getUzytkownik, updateUzytkownik } from "../controllers/uzytkownik.controller";

import { Router } from "express";

const router = Router();

router.get("/", getUzytkownicy);
router.get("/:id", getUzytkownik);
router.post("/", createUzytkownik);
router.put("/:id", updateUzytkownik);
router.delete("/:id", deleteUzytkownik);

export default router;