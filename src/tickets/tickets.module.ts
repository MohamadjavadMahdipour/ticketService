import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity/ticket.entity';
import { Chat } from '../chats/entities/chat.entity/chat.entity';
import { File } from '../files/entities/file.entity/file.entity';
import { User } from '../users/entities/user.entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Chat, File, User]), // <-- important
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
