export interface Car {
  id_samochodu: number;
  marka: string;
  model: string;
  rok_produkcji: number;
  cena_za_dzien: number;
  zdjecie?: string;
  status?: string;
}