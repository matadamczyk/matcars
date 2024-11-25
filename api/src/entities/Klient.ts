import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Klient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imie: string;

  @Column()
  nazwisko: string;

  @Column()
  email: string;
}