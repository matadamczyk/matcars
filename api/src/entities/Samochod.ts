import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Samochod {
  @PrimaryGeneratedColumn()
  id_samochodu: number;

  @Column()
  marka: string;

  @Column()
  model: string;

  @Column()
  rok_produkcji: number;

  @Column()
  cena_za_dzien: number;
}