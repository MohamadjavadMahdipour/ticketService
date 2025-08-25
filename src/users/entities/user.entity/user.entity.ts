import { Ticket } from 'src/tickets/entities/ticket.entity/ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  rank: string;

  @Column({ type: 'datetime', nullable: true })
  last_login: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  branch: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  trust: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  visiblecustomers: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sales_manager: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  tosee_card: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  tosee_hesab: string;

  @Column({ type: 'varchar', length: 24, nullable: true })
  tosee_sheba: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tosee_owner: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  second_card: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  second_hesab: string;

  @Column({ type: 'varchar', length: 24, nullable: true })
  second_sheba: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  second_owner: string;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  visiblecustomersname: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nickname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contract_type: string;

  @Column({ type: 'int', nullable: true })
  otp: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  SmsCountDown: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar: string;

  @Column({ type: 'varchar', length: 30, default: 'employee' })
  role: string;

  @Column({ type: 'int', nullable: true })
  department_id: number;

  @Column({ type: 'tinyint', width: 1, default: 1 })
  is_active: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_staff: boolean;

  @Column({ type: 'int', nullable: true })
  is_superuser: number;

  @CreateDateColumn({ type: 'datetime', name: 'date_joined' })
  date_joined: Date;
  @OneToMany(() => Ticket, (ticket) => ticket.owner)
  tickets: Ticket[];
}
