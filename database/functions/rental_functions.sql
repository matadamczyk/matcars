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

CREATE OR REPLACE FUNCTION is_car_available(
    p_car_id INTEGER,
    p_start_date DATE,
    p_end_date DATE
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 
        FROM wypozyczenia
        WHERE id_samochodu = p_car_id
        AND status = 'aktywne'
        AND (data_wypozyczenia, data_zwrotu) OVERLAPS (p_start_date, p_end_date)
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_user_permission(
    p_user_id INTEGER,
    p_action VARCHAR,
    p_resource VARCHAR
) RETURNS BOOLEAN AS $$
DECLARE
    v_role VARCHAR;
BEGIN
    SELECT rola INTO v_role
    FROM uzytkownicy
    WHERE id_uzytkownika = p_user_id;

    RETURN CASE
        WHEN v_role = 'admin' THEN TRUE
        WHEN v_role = 'pracownik' AND p_action IN ('SELECT', 'INSERT', 'UPDATE') THEN TRUE
        WHEN v_role = 'klient' AND p_action = 'SELECT' THEN TRUE
        ELSE FALSE
    END;
END;
$$ LANGUAGE plpgsql;