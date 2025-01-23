-- Funkcja sprawdzająca dostępność samochodu
CREATE OR REPLACE FUNCTION test.is_car_available(
    p_car_id INTEGER,
    p_start_date DATE,
    p_end_date DATE
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1
        FROM test.wypozyczenia
        WHERE id_samochodu = p_car_id
        AND status = 'aktywne'
        AND (data_wypozyczenia, data_zwrotu) OVERLAPS (p_start_date, p_end_date)
    );
END;
$$ LANGUAGE plpgsql;