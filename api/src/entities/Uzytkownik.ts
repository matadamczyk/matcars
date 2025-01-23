import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Klient } from "./Klient";
import { Role } from "./Role";
import { Wypozyczenie } from "./Wypozyczenie";

@Entity("uzytkownicy")
export class Uzytkownik {
    @PrimaryGeneratedColumn()
    id_uzytkownika!: number;

    @Column()
    imie!: string;

    @Column()
    nazwisko!: string;

    @Column()
    email!: string;

    @Column()
    haslo!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    last_login!: Date;

    @ManyToOne(() => Role, role => role.uzytkownicy)
    rola!: Role;

    @OneToOne(() => Klient, klient => klient.uzytkownik)
    klient!: Klient;

    @OneToMany(() => Wypozyczenie, wypozyczenie => wypozyczenie.created_by)
    utworzone_wypozyczenia!: Wypozyczenie[];
}