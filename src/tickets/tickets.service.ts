import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity/ticket.entity';
import { Chat } from '../chats/entities/chat.entity/chat.entity';
import { File } from '../files/entities/file.entity/file.entity';
import { User } from '../users/entities/user.entity/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,

    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create ticket with initial chat and optional files
 async createFirstTicket(
  ownerId: number,
  title: string,
  mainText: string,
  files?: Express.Multer.File[],
) {
  // Find the user
  const owner = await this.userRepository.findOneBy({ id: ownerId });
  if (!owner) throw new NotFoundException('User not found');

  // Create a new chat
  const chat = this.chatRepository.create({ status: 'open' });
  await this.chatRepository.save(chat);

  // Create the ticket and link it to the chat
  const ticket = this.ticketRepository.create({
    title,
    mainText,
    status: 'open',
    owner,
    chat,
  });
  await this.ticketRepository.save(ticket);

  // Attach files if provided
  if (files?.length) {
    const fileEntities = files.map((file) =>
      this.fileRepository.create({
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        ticket,
      }),
    );
    await this.fileRepository.save(fileEntities);
    ticket.files = fileEntities;
  }

  // Return the ticket with relations
  return this.ticketRepository.findOne({
    where: { id: ticket.id },
    relations: ['owner', 'chat', 'files'],
  });
 }
 async addTicketToChat(
  chatId: number,
  ownerId: number,
  title: string,
  mainText: string,
  files?: Express.Multer.File[],
) {
  // Find the chat
  const chat = await this.chatRepository.findOne({
    where: { id: chatId },
    relations: ['tickets'],
  });
  if (!chat) throw new NotFoundException('Chat not found');

  // Find the user (owner)
  const owner = await this.userRepository.findOneBy({ id: ownerId });
  if (!owner) throw new NotFoundException('User not found');

  // Create a new ticket linked to the existing chat
  const ticket = this.ticketRepository.create({
    title,
    mainText,
    status: 'open',
    owner,
    chat,
  });
  await this.ticketRepository.save(ticket);

  // Attach files if any
  if (files?.length) {
    const fileEntities = files.map((file) =>
      this.fileRepository.create({
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        ticket,
      }),
    );
    await this.fileRepository.save(fileEntities);
    ticket.files = fileEntities;
  }

  // Return ticket with all relations
  return this.ticketRepository.findOne({
    where: { id: ticket.id },
    relations: ['owner', 'chat', 'files'],
  });
 }
 async getChatsForUser(userId: number) {
  // Ensure the user exists
  const user = await this.userRepository.findOneBy({ id: userId });
  if (!user) throw new NotFoundException('User not found');

  // Find all chats that have at least one ticket owned by this user
  const chats = await this.chatRepository
    .createQueryBuilder('chat')
    .leftJoinAndSelect('chat.tickets', 'ticket')
    .leftJoinAndSelect('ticket.owner', 'owner')
    .leftJoinAndSelect('ticket.files', 'files')
    .where('ticket.owner = :userId', { userId })
    .orderBy('chat.createdAt', 'DESC')
    .getMany();

  return chats;
}
async getAllChats() {
  // Fetch all chats with tickets, ticket owners, and files
  const chats = await this.chatRepository.find({
    relations: ['tickets', 'tickets.owner', 'tickets.files'],
    order: { createdAt: 'DESC' },
  });

  return chats;
}
async getChatById(chatId: number) {
  // Find the chat with all tickets, owners, and files
  const chat = await this.chatRepository.findOne({
    where: { id: chatId },
    relations: ['tickets', 'tickets.owner', 'tickets.files'],
  });

  if (!chat) throw new NotFoundException('Chat not found');

  return chat;
}
async closeChat(chatId: number) {
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    chat.status = 'closed';
    await this.chatRepository.save(chat);

    return { message: 'Chat closed successfully', chatId: chat.id, status: chat.status };
  }

}
