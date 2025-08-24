import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ticket } from '../../../tickets/entities/ticket.entity/ticket.entity';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  url: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.files, { onDelete: 'CASCADE' })
  ticket: Ticket;

  @CreateDateColumn()
  createdAt: Date;
}
