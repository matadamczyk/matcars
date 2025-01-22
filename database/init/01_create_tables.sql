BEGIN;

CREATE TABLE role (
    id_roli SERIAL PRIMARY KEY,
    nazwa VARCHAR(50) NOT NULL
);

CREATE TABLE uzytkownicy (
    id_uzytkownika SERIAL PRIMARY KEY,
    imie VARCHAR(50) NOT NULL,
    nazwisko VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    haslo VARCHAR(255) NOT NULL,
    id_roli INTEGER REFERENCES role(id_roli),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE klienci (
    id_klienta SERIAL PRIMARY KEY,
    imie VARCHAR(50) NOT NULL,
    nazwisko VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefon VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_uzytkownika INTEGER REFERENCES uzytkownicy(id_uzytkownika)
);

CREATE TABLE samochody (
    id_samochodu SERIAL PRIMARY KEY,
    marka VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    rok_produkcji INTEGER NOT NULL,
    cena_za_dzien DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'dostepny',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    zdjecie TEXT,
    CONSTRAINT check_rok_produkcji CHECK (rok_produkcji >= 1900 AND rok_produkcji <= EXTRACT(YEAR FROM CURRENT_DATE)),
    CONSTRAINT check_cena CHECK (cena_za_dzien > 0)
);

CREATE TABLE wypozyczenia (
    id_wypozyczenia SERIAL PRIMARY KEY,
    id_klienta INTEGER REFERENCES klienci(id_klienta),
    id_samochodu INTEGER REFERENCES samochody(id_samochodu),
    data_wypozyczenia DATE NOT NULL,
    data_zwrotu DATE NOT NULL,
    calkowity_koszt DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'aktywne',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES uzytkownicy(id_uzytkownika),
    CONSTRAINT check_daty CHECK (data_zwrotu >= data_wypozyczenia),
    CONSTRAINT check_koszt CHECK (calkowity_koszt >= 0)
);

COMMIT;