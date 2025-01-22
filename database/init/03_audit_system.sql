CREATE TABLE audit_logs (
    id_log SERIAL PRIMARY KEY,
    tabela VARCHAR(50) NOT NULL,
    operacja VARCHAR(20) NOT NULL,
    data_operacji TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uzytkownik_id INTEGER REFERENCES uzytkownicy(id_uzytkownika),
    stare_dane JSONB,
    nowe_dane JSONB
);

CREATE OR REPLACE FUNCTION log_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (
        tabela,
        operacja,
        uzytkownik_id,
        stare_dane,
        nowe_dane
    ) VALUES (
        TG_TABLE_NAME,
        TG_OP,
        current_setting('app.current_user_id')::INTEGER,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('UPDATE', 'INSERT') THEN row_to_json(NEW) ELSE NULL END
    );
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_wypozyczenia_changes
    AFTER INSERT OR UPDATE OR DELETE ON wypozyczenia
    FOR EACH ROW EXECUTE FUNCTION log_changes();

CREATE TRIGGER audit_samochody_changes
    AFTER INSERT OR UPDATE OR DELETE ON samochody
    FOR EACH ROW EXECUTE FUNCTION log_changes();

CREATE TRIGGER audit_klienci_changes
    AFTER INSERT OR UPDATE OR DELETE ON klienci
    FOR EACH ROW EXECUTE FUNCTION log_changes();