import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { User } from './user.entity';
import { EditUserInput } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(args: CreateUserInput): Promise<User> {
    return await this.userRepository.save({ ...args });
  }

  async findOneById(id: string, relations?: string[]): Promise<User> {
    if (relations === undefined) {
      return await this.userRepository.findOne(id);
    } else {
      return await this.userRepository.findOne({
        where: id,
        relations: [...relations],
      });
    }
  }

  async findOneByUsername(
    username: string,
    relations?: string[],
  ): Promise<User> {
    if (relations === undefined) {
      return await this.userRepository.findOne({
        where: { username },
      });
    } else {
      return await this.userRepository.findOne({
        where: { username },
        relations: [...relations],
      });
    }
  }

  async edit(user: User, args: EditUserInput): Promise<User> {
    user.avatar = args.avatar;
    await this.userRepository.save(user);
    return user;
  }

  async findAll(relations?: string[]): Promise<User[]> {
    if (relations === undefined) {
      return await this.userRepository.find();
    } else {
      return await this.userRepository.find({ relations: [...relations] });
    }
  }

  async remove(id: string): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}
