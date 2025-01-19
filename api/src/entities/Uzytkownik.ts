import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("uzytkownicy")
export class Uzytkownik {
    @PrimaryGeneratedColumn()
    id_uzytkownika!: number;

    @Column({ length: 50 })
    imie!: string;

    @Column({ length: 50 })
    nazwisko!: string;

    @Column({ length: 100, unique: true })
    email!: string;

    @Column()
    haslo!: string; 

    @Column({ length: 20, default: "klient" })
    rola!: string;
}