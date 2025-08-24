import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFirstTicketDto {
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
