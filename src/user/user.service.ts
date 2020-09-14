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

  async create(args: CreateUserInput): Promise<User> {
    return await this.userRepository.save({ ...args });
  }

  async findOneById(id: number, relations?: string[]): Promise<User> {
    if (relations === undefined) {
      return await this.userRepository.findOne(id);
    } else {
      return await this.userRepository.findOne({
        where: { id },
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

  async updateAvatar(user: User, avatar: string): Promise<User> {
    user.avatar = avatar;
    await this.userRepository.save(user);
    return user;
  }

  async setLocation(
    user: User,
    latitude: number,
    longitude: number,
  ): Promise<User> {
    user.latitude = latitude;
    user.longitude = longitude;
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

  async remove(id: number): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}
