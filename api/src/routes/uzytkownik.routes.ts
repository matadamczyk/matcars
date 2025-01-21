import { createUzytkownik, deleteUzytkownik, getCurrentUser, getUzytkownicy, getUzytkownik, loginUzytkownik, logoutUzytkownik, registerUzytkownik, updateUzytkownik } from "../controllers/uzytkownik.controller";

import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get("/me", getCurrentUser);
router.get("/", getUzytkownicy);
router.get("/:id", getUzytkownik);
router.post("/", createUzytkownik);
router.put("/:id", updateUzytkownik);
router.delete("/:id", deleteUzytkownik);

router.post(
  "/register",
  [
    body("imie").notEmpty().withMessage("Imię jest wymagane"),
    body("nazwisko").notEmpty().withMessage("Nazwisko jest wymagane"),
    body("email").isEmail().withMessage("Podaj prawidłowy adres email"),
    body("haslo").isLength({ min: 6 }).withMessage("Hasło musi mieć min. 6 znaków"),
  ],
  registerUzytkownik
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Podaj prawidłowy adres email"),
    body("haslo").notEmpty().withMessage("Hasło jest wymagane"),
  ],
  loginUzytkownik
);

router.post("/logout", logoutUzytkownik);

export default router;