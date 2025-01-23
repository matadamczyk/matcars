import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Wypozyczenie } from "./Wypozyczenie";

@Entity("samochody")
export class Samochod {
    @PrimaryGeneratedColumn()
    id_samochodu!: number;

    @Column({ type: 'varchar', nullable: true })
    marka!: string;

    @Column({ type: 'varchar', nullable: true })
    model!: string;

    @Column()
    rok_produkcji!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    cena_za_dzien!: number;

    @Column({ default: 'dostepny' })
    status!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ nullable: true })
    zdjecie!: string;

    @OneToMany(() => Wypozyczenie, wypozyczenie => wypozyczenie.samochod)
    wypozyczenia!: Wypozyczenie[];
}