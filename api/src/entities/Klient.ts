import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Wypozyczenie } from "./Wypozyczenie";

@Entity("klienci")
export class Klient {
    @PrimaryGeneratedColumn()
    id_klienta!: number;

    @Column({ length: 50 })
    imie!: string;

    @Column({ length: 50 })
    nazwisko!: string;

    @Column({ length: 100, unique: true })
    email!: string;

    @Column({ length: 15, nullable: true }) 
    telefon!: string;

    @OneToMany(() => Wypozyczenie, (wypozyczenie) => wypozyczenie.klient)
    wypozyczenia!: Wypozyczenie[];
}