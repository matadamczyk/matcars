export interface Rent {
  id_wypozyczenia: number;
  data_wypozyczenia: string;
  data_zwrotu: string;
  calkowity_koszt: number;
  klient: {
    id_klienta: number;
    imie: string;
    nazwisko: string;
    email: string;
    telefon: string;
  };
  samochod: {
    id_samochodu: number;
    marka: string;
    model: string;
  };
}