import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateTicketDto, CreateTicketDtoWithFiles } from './dto/create-first-ticket.dto';
import { AddTicketToChatDto , CreateTicketDtoWithFilesForAdd} from './dto/add-ticket-to-chat.dto';
import { multerConfig } from 'src/config/multer.config';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  /**
   * Create first ticket (auto-create chat)
   */
  @Post('create-first-ticket')
  @UseInterceptors(FilesInterceptor('files', 10,multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTicketDtoWithFiles })
  async createFirstTicket(
    @Body() dto: CreateTicketDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const { ownerId, title, mainText } = dto;
    return this.ticketsService.createFirstTicket(ownerId, title, mainText, files);
  }

  /**
   * Add a ticket to an existing chat
   */
  @Post('chat/add-ticket')
  @UseInterceptors(FilesInterceptor('files', 10,multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTicketDtoWithFilesForAdd })
  async addTicketToChat(
    @Body() dto: AddTicketToChatDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const { chatId, ownerId, title, mainText } = dto;
    return this.ticketsService.addTicketToChat(chatId, ownerId, title, mainText, files);
  }

  /**
   * Get all chats
   */
  @Get('chats')
  async getAllChats() {
    return this.ticketsService.getAllChats();
  }

  /**
   * Get all chats for a specific user
   */
  @Get('user/:userId/chats')
  async getChatsForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.ticketsService.getChatsForUser(userId);
  }

  /**
   * Get one chat by ID
   */
  @Get('chat/:chatId')
  async getChatById(@Param('chatId', ParseIntPipe) chatId: number) {
    return this.ticketsService.getChatById(chatId);
  }

  @Post('chat/:chatId/close')
  @ApiOperation({ summary: 'Close a chat' })
  @ApiParam({ name: 'chatId', type: Number })
  async closeChat(@Param('chatId') chatId: number) {
  return this.ticketsService.closeChat(chatId);
  }
}
