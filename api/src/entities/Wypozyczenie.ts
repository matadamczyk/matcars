import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Klient } from "./Klient";
import { Samochod } from "./Samochod";

@Entity()
export class Wypozyczenie {
  @PrimaryGeneratedColumn()
  id_wypozyczenia: number;

  @ManyToOne(() => Klient)
  @JoinColumn({ name: "id_klienta" })
  id_klienta: Klient;

  @ManyToOne(() => Samochod)
  @JoinColumn({ name: "id_samochodu" })
  id_samochodu: Samochod;

  @Column()
  data_wypozyczenia: Date;

  @Column()
  data_zwrotu: Date;

  @Column()
  calkowity_koszt: number;
}