-- Widok aktywnych wypożyczeń
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