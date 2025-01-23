import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Klient } from "./Klient";
import { Samochod } from "./Samochod";
import { Uzytkownik } from "./Uzytkownik";

@Entity("wypozyczenia")
export class Wypozyczenie {
    @PrimaryGeneratedColumn()
    id_wypozyczenia!: number;

    @Column({ type: "date" })
    data_wypozyczenia!: Date;

    @Column({ type: "date" })
    data_zwrotu!: Date;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    calkowity_koszt!: number;

    @Column({ default: 'aktywne' })
    status!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @ManyToOne(() => Klient, klient => klient.wypozyczenia)
    @JoinColumn({ name: "id_klienta" })
    klient!: Klient;

    @ManyToOne(() => Samochod, samochod => samochod.wypozyczenia)
    @JoinColumn({ name: "id_samochodu" })
    samochod!: Samochod;

    @ManyToOne(() => Uzytkownik, uzytkownik => uzytkownik.utworzone_wypozyczenia)
    @JoinColumn({ name: "created_by" })
    created_by!: Uzytkownik;
}