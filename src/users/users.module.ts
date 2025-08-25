import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity/ticket.entity';
import { Chat } from 'src/chats/entities/chat.entity/chat.entity';
import { File } from 'src/files/entities/file.entity/file.entity';
import { User } from './entities/user.entity/user.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([Ticket, Chat, File, User]), // <-- important
    ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
