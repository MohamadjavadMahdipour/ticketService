import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../../users/entities/user.entity/user.entity';
import { Chat } from '../../../chats/entities/chat.entity/chat.entity';
import { File } from '../../../files/entities/file.entity/file.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  mainText: string;

  @Column()
  title: string;

  @Column({ default: 'open' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tickets, { onDelete: 'CASCADE' })
  owner: User;

  @ManyToOne(() => Chat, (chat) => chat.tickets, { onDelete: 'CASCADE' })
  chat: Chat;

  @OneToMany(() => File, (file) => file.ticket)
  files: File[];
}
