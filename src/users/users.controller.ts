import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-test')
  @ApiOperation({ summary: 'Create a test user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        phone_number: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['name', 'phone_number', 'username', 'password'],
    },
  })
  async createTestUser(@Body() body: any) {
    return this.usersService.createTestUser(body.name, body.phone_number, body.username, body.password);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
