import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from '../../../tickets/entities/ticket.entity/ticket.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ name: 'phone_number', length: 15, nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ default: 'status' })
  rank: string;

  @Column({ type: 'datetime', nullable: true })
  lastLogin: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.owner)
  tickets: Ticket[];
}
