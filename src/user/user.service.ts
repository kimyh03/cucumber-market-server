import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserData: CreateUserInput): Promise<User> {
    return await this.userRepository.save({ ...createUserData });
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}
