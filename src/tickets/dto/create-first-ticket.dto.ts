import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  mainText: string;
}

// For Swagger to show file upload
export class CreateTicketDtoWithFiles extends CreateTicketDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
  files?: any[];
}
