-- Widok dostępności samochodów
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