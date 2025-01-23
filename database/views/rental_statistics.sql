-- Widok statystyk wypożyczeń
CREATE VIEW rental_statistics AS
SELECT
    s.marka,
    s.model,
    COUNT(w.id_wypozyczenia) as total_rentals,
    SUM(w.calkowity_koszt) as total_revenue,
    AVG(w.calkowity_koszt) as avg_revenue
FROM samochody s
LEFT JOIN wypozyczenia w ON s.id_samochodu = w.id_samochodu
GROUP BY s.id_samochodu, s.marka, s.model
HAVING AVG(w.calkowity_koszt) > 200;