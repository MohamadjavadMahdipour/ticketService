import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddTicketToChatDto {
  @ApiProperty({ description: 'ID of the chat to add ticket to' })
  @IsInt()
  chatId: number;

  @ApiProperty({ description: 'ID of the ticket owner' })
  @IsInt()
  ownerId: number;

  @ApiProperty({ description: 'Ticket title' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Ticket main text' })
  @IsNotEmpty()
  mainText: string;
}
export class CreateTicketDtoWithFiles extends AddTicketToChatDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
  files?: any[];
}