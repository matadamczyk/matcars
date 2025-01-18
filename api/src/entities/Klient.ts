import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Klient {
  @PrimaryGeneratedColumn()
  id_klienta!: number;

  @Column()
  imie!: string;

  @Column()
  nazwisko!: string;

  @Column()
  email!: string;

  @Column()
  telefon!: string
}