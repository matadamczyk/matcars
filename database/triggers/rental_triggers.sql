CREATE OR REPLACE FUNCTION validate_rental_dates()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.data_zwrotu <= NEW.data_wypozyczenia THEN
        RAISE EXCEPTION 'Data zwrotu musi być późniejsza niż data wypożyczenia';
    END IF;

    IF NOT is_car_available(NEW.id_samochodu, NEW.data_wypozyczenia, NEW.data_zwrotu) THEN
        RAISE EXCEPTION 'Samochód jest niedostępny w wybranym terminie';
    END IF;

    IF NEW.calkowity_koszt IS NULL THEN
        NEW.calkowity_koszt := calculate_rental_cost(
            NEW.id_samochodu,
            NEW.data_wypozyczenia,
            NEW.data_zwrotu
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_rental_insert
    BEFORE INSERT ON wypozyczenia
    FOR EACH ROW
    EXECUTE FUNCTION validate_rental_dates();