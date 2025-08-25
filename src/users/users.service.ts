import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTestUser(name: string, phone_number: string, username: string, password: string) {
    const user = this.userRepository.create({
      name,
      phone_number,
      username,
      password,
      role: 'employee',
      is_active: true,
    });
    return this.userRepository.save(user);
  }

  async getAllUsers() {
    return this.userRepository.find();
  }
}
