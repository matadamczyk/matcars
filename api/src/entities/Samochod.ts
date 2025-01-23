import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Wypozyczenie } from "./Wypozyczenie";

@Entity("samochody")
export class Samochod {
    @PrimaryGeneratedColumn()
    id_samochodu!: number;

    @Column({ type: 'varchar', length: 50, nullable: false})
    marka!: string;

    @Column({ type: 'varchar', length: 50, nullable: false})
    model!: string;

    @Column({ type: 'int', nullable: false})
    rok_produkcji!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    cena_za_dzien!: number;

    @Column({ default: 'dostepny' })
    status!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column()
    zdjecie!: string;

    @OneToMany(() => Wypozyczenie, wypozyczenie => wypozyczenie.samochod)
    wypozyczenia!: Wypozyczenie[];
}