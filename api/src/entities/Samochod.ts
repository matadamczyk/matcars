import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Wypozyczenie } from "./Wypozyczenie";

@Entity("samochody")
export class Samochod {
    @PrimaryGeneratedColumn()
    id_samochodu!: number;

    @Column({ length: 50 })
    marka!: string;

    @Column({ length: 50 })
    model!: string;

    @Column()
    rok_produkcji!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    cena_za_dzien!: number;

    @OneToMany(() => Wypozyczenie, (wypozyczenie) => wypozyczenie.samochod)
    wypozyczenia!: Wypozyczenie[];
}