import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Klient } from "./Klient";
import { Samochod } from "./Samochod";

@Entity("wypozyczenia")
export class Wypozyczenie {
    @PrimaryGeneratedColumn()
    id_wypozyczenia!: number;

    @Column({ type: "date" })
    data_wypozyczenia!: Date;

    @Column({ type: "date" })
    data_zwrotu!: Date;

    @Column("decimal", { precision: 10, scale: 2 })
    calkowity_koszt!: number;

    @ManyToOne(() => Klient, (klient) => klient.wypozyczenia, { onDelete: "CASCADE" })
    klient!: Klient;

    @ManyToOne(() => Samochod, (samochod) => samochod.wypozyczenia, { onDelete: "CASCADE" })
    samochod!: Samochod;
}