-- Trigger walidacji wypożyczeń
CREATE OR REPLACE TRIGGER before_rental_insert
    BEFORE INSERT ON test.wypozyczenia
    FOR EACH ROW
    EXECUTE FUNCTION test.validate_rental_dates();