import { Rent } from "./Rent.interface";

export interface Customer {
  id_klienta: number;
  imie: string;
  nazwisko: string;
  email: string;
  telefon: string;
  wypozyczenia?: Rent[];
}