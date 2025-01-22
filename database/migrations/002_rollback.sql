BEGIN;

DROP TABLE IF EXISTS klienci CASCADE;
DROP TABLE IF EXISTS samochody CASCADE;
DROP TABLE IF EXISTS wypozyczenia CASCADE;
DROP TABLE IF EXISTS uzytkownicy CASCADE;

ALTER TABLE temp_klienci RENAME TO klienci;
ALTER TABLE temp_samochody RENAME TO samochody;
ALTER TABLE temp_wypozyczenia RENAME TO wypozyczenia;
ALTER TABLE temp_uzytkownicy RENAME TO uzytkownicy;

COMMIT;