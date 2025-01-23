import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Uzytkownik } from "./Uzytkownik";

@Entity("audit_logs")
export class Logi {
    @PrimaryGeneratedColumn()
    id_log!: number;

    @Column({ type: 'varchar', length: 50 })
    tabela!: string;

    @Column({ type: 'varchar', length: 20 })
    operacja!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    data_operacji!: Date;

    @ManyToOne(() => Uzytkownik)
    @JoinColumn({ name: 'uzytkownik_id' })
    uzytkownik!: Uzytkownik;

    @Column({ type: 'jsonb', nullable: true })
    stare_dane!: object;

    @Column({ type: 'jsonb', nullable: true })
    nowe_dane!: object;
}