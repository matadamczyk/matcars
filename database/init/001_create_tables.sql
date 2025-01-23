-- Tabela Klienci
CREATE TABLE klienci (
    id_klienta SERIAL PRIMARY KEY,
    imie VARCHAR(50) NOT NULL,
    nazwisko VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefon VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_uzytkownika INTEGER REFERENCES uzytkownicy(id_uzytkownika)
);

-- Tabela Samochody
CREATE TABLE samochody (
    id_samochodu SERIAL PRIMARY KEY,
    marka VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    rok_produkcji INT NOT NULL,
    cena_za_dzien DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'dostepny',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    zdjecie VARCHAR(255),
    CONSTRAINT check_rok_produkcji CHECK (rok_produkcji >= 1900 AND rok_produkcji <= EXTRACT(YEAR FROM CURRENT_DATE)),
    CONSTRAINT check_cena CHECK (cena_za_dzien > 0)
);

-- Tabela Wypozyczenia
CREATE TABLE wypozyczenia (
    id_wypozyczenia SERIAL PRIMARY KEY,
    id_klienta INT NOT NULL,
    id_samochodu INT NOT NULL,
    data_wypozyczenia DATE NOT NULL,
    data_zwrotu DATE NOT NULL,
    calkowity_koszt DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'aktywne',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER REFERENCES uzytkownicy(id_uzytkownika),
    CONSTRAINT check_daty CHECK (data_zwrotu >= data_wypozyczenia),
    CONSTRAINT check_koszt CHECK (calkowity_koszt >= 0),
    FOREIGN KEY (id_klienta) REFERENCES klienci(id_klienta),
    FOREIGN KEY (id_samochodu) REFERENCES samochody(id_samochodu)
);

-- Tabela Role
CREATE TABLE role (
    id_roli SERIAL PRIMARY KEY,
    nazwa VARCHAR(50) NOT NULL
);

-- Wstawienie początkowych ról
INSERT INTO role (nazwa) VALUES
    ('admin'),
    ('pracownik'),
    ('klient');
    
-- Tabela Uzytkownicy
CREATE TABLE uzytkownicy (
    id_uzytkownika SERIAL PRIMARY KEY,
    imie VARCHAR(50) NOT NULL,
    nazwisko VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    haslo VARCHAR(255) NOT NULL,
    id_roli INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    CONSTRAINT fk_user_role FOREIGN KEY (id_roli) REFERENCES role(id_roli)
);
