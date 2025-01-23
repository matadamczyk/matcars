import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Uzytkownik } from "./Uzytkownik";

@Entity("role")
export class Role {
    @PrimaryGeneratedColumn()
    id_roli!: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    nazwa!: string;

    @OneToMany(() => Uzytkownik, uzytkownik => uzytkownik.rola)
    uzytkownicy!: Uzytkownik[];
}