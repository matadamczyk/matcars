export interface Role {
  id_roli: number;
  nazwa: string;
}

export interface User {
  id_uzytkownika: number;
  imie: string;
  nazwisko: string;
  email: string;
  haslo: string;
  rola: Role;
  last_login: Date;
}

