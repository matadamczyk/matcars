CREATE VIEW active_rentals AS
SELECT 
    w.id_wypozyczenia,
    k.imie || ' ' || k.nazwisko AS klient,
    k.telefon,
    s.marka || ' ' || s.model AS samochod,
    w.data_wypozyczenia,
    w.data_zwrotu,
    w.calkowity_koszt
FROM wypozyczenia w
JOIN klienci k ON w.id_klienta = k.id_klienta
JOIN samochody s ON w.id_samochodu = s.id_samochodu
WHERE w.status = 'aktywne';

CREATE VIEW car_availability AS
SELECT 
    s.id_samochodu,
    s.marka,
    s.model,
    s.rok_produkcji,
    s.cena_za_dzien,
    s.status,
    CASE 
        WHEN w.id_wypozyczenia IS NULL THEN true
        ELSE false
    END as is_available
FROM samochody s
LEFT JOIN wypozyczenia w ON s.id_samochodu = w.id_samochodu
    AND w.status = 'aktywne'
    AND CURRENT_DATE BETWEEN w.data_wypozyczenia AND w.data_zwrotu;

CREATE VIEW rental_statistics AS
SELECT 
    s.marka,
    s.model,
    COUNT(w.id_wypozyczenia) as total_rentals,
    SUM(w.calkowity_koszt) as total_revenue,
    AVG(w.calkowity_koszt) as avg_revenue
FROM samochody s
LEFT JOIN wypozyczenia w ON s.id_samochodu = w.id_samochodu
GROUP BY s.id_samochodu, s.marka, s.model;

CREATE VIEW high_value_rentals AS
SELECT 
    k.imie || ' ' || k.nazwisko AS klient,
    COUNT(w.id_wypozyczenia) as liczba_wypozyczen,
    SUM(w.calkowity_koszt) as suma_wydatkow
FROM klienci k
JOIN wypozyczenia w ON k.id_klienta = w.id_klienta
GROUP BY k.id_klienta, k.imie, k.nazwisko
HAVING SUM(w.calkowity_koszt) > 1000;

CREATE VIEW popular_cars AS
SELECT 
    s.marka,
    s.model,
    COUNT(w.id_wypozyczenia) as liczba_wypozyczen,
    SUM(w.calkowity_koszt) as suma_przychodu
FROM samochody s
LEFT JOIN wypozyczenia w ON s.id_samochodu = w.id_samochodu
GROUP BY s.id_samochodu, s.marka, s.model
HAVING COUNT(w.id_wypozyczenia) > 5;

CREATE VIEW vip_clients AS
SELECT 
    k.id_klienta,
    k.imie || ' ' || k.nazwisko as klient,
    COUNT(w.id_wypozyczenia) as liczba_wypozyczen,
    SUM(w.calkowity_koszt) as suma_wydatkow
FROM klienci k
JOIN wypozyczenia w ON k.id_klienta = w.id_klienta
GROUP BY k.id_klienta, k.imie, k.nazwisko
HAVING SUM(w.calkowity_koszt) > 1000;