export interface Logi {
    id_log: number;
    tabela: string;
    operacja: string;
    data_operacji: Date;
    uzytkownik_id: number;
    stare_dane: object;
    nowe_dane: object;
}
