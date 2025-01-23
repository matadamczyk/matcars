import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Uzytkownik } from "./Uzytkownik";
import { Wypozyczenie } from "./Wypozyczenie";

@Entity("klienci")
export class Klient {
    @PrimaryGeneratedColumn()
    id_klienta! : number;

    @Column({ type: 'varchar', nullable: true })
    imie!: string;

    @Column({ type: 'varchar', nullable: true })
      nazwisko!: string;

    @Column({ unique: true, nullable: true })
    email!: string;

    @Column({ nullable: true })
    telefon!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @OneToOne(() => Uzytkownik)
    @JoinColumn({ name: "id_uzytkownika" })
    uzytkownik!: Uzytkownik;

    @OneToMany(() => Wypozyczenie, wypozyczenie => wypozyczenie.klient)
    wypozyczenia!: Wypozyczenie[];
}