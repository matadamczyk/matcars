import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Uzytkownik {
  @PrimaryGeneratedColumn()
  id_uzytkownika: number;

  @Column()
  imie: string;

  @Column()
  nazwisko: string;

  @Column()
  email: string;

  @Column()
  haslo: string;

  @Column()
  rola: string;
}