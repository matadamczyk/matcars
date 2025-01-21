export interface Rent {
  data_wypozyczenia: string;
  data_zwrotu: string;
  calkowity_koszt: number;
  klient: any;
  samochod: { id_samochodu: number };
}