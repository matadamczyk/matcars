BEGIN;

CREATE TABLE temp_klienci AS SELECT * FROM klienci;
CREATE TABLE temp_samochody AS SELECT * FROM samochody;
CREATE TABLE temp_wypozyczenia AS SELECT * FROM wypozyczenia;
CREATE TABLE temp_uzytkownicy AS SELECT * FROM uzytkownicy;

CREATE TABLE role (
    id_roli SERIAL PRIMARY KEY,
    nazwa VARCHAR(50) NOT NULL
);

INSERT INTO role (nazwa) VALUES 
    ('admin'),
    ('pracownik'),
    ('klient');

ALTER TABLE klienci
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN id_uzytkownika INTEGER;

ALTER TABLE samochody
    ADD COLUMN status VARCHAR(20) DEFAULT 'dostepny',
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE wypozyczenia
    ADD COLUMN status VARCHAR(20) DEFAULT 'aktywne',
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN created_by INTEGER;

ALTER TABLE uzytkownicy
    ADD COLUMN id_roli INTEGER,
    ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN last_login TIMESTAMP;

UPDATE uzytkownicy 
SET id_roli = (
    CASE 
        WHEN rola = 'admin' THEN (SELECT id_roli FROM role WHERE nazwa = 'admin')
        WHEN rola = 'pracownik' THEN (SELECT id_roli FROM role WHERE nazwa = 'pracownik')
        ELSE (SELECT id_roli FROM role WHERE nazwa = 'klient')
    END
);

ALTER TABLE uzytkownicy
    ADD CONSTRAINT fk_user_role FOREIGN KEY (id_roli) REFERENCES role(id_roli);

ALTER TABLE klienci
    ADD CONSTRAINT fk_klient_user FOREIGN KEY (id_uzytkownika) REFERENCES uzytkownicy(id_uzytkownika);

ALTER TABLE wypozyczenia
    ADD CONSTRAINT fk_wypozyczenie_user FOREIGN KEY (created_by) REFERENCES uzytkownicy(id_uzytkownika),
    ADD CONSTRAINT check_daty CHECK (data_zwrotu >= data_wypozyczenia),
    ADD CONSTRAINT check_koszt CHECK (calkowity_koszt >= 0);

ALTER TABLE samochody
    ADD CONSTRAINT check_rok_produkcji CHECK (rok_produkcji >= 1900 AND rok_produkcji <= EXTRACT(YEAR FROM CURRENT_DATE)),
    ADD CONSTRAINT check_cena CHECK (cena_za_dzien > 0);

ALTER TABLE uzytkownicy DROP COLUMN rola;

COMMIT;