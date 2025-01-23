-- Funkcja obliczająca koszt wypożyczenia
CREATE OR REPLACE FUNCTION calculate_rental_cost(
    p_car_id INTEGER,
    p_start_date DATE,
    p_end_date DATE
) RETURNS DECIMAL AS $$
DECLARE
    v_daily_rate DECIMAL;
    v_days INTEGER;
BEGIN
    SELECT cena_za_dzien INTO v_daily_rate
    FROM samochody
    WHERE id_samochodu = p_car_id;

    v_days := p_end_date - p_start_date;

    RETURN v_daily_rate * v_days;
END;
$$ LANGUAGE plpgsql;