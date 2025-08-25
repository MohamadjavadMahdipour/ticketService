import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';

import { TicketsModule } from './tickets/tickets.module';
import { User } from './users/entities/user.entity/user.entity';
import { Ticket } from './tickets/entities/ticket.entity/ticket.entity';
import { Chat } from './chats/entities/chat.entity/chat.entity';
import { File } from './files/entities/file.entity/file.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '194.60.230.40',  
      port: 3306,
      username: 'remote_user3',
      password: '@Aram830908',
      database: 'Ghestila_Panel',
      entities: [Ticket,Chat,File,User],
      synchronize: true, // ❌ disable in production, use migrations
    }),

    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + '-' + file.originalname);
        },
      }),
    }),

    TicketsModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class AppModule {}
