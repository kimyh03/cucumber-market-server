import { Injectable, NotFoundException } from '@nestjs/common';
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
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new NotFoundException();
      } else {
        return user;
      }
    } else {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: [...relations],
      });
      if (!user) {
        throw new NotFoundException();
      } else {
        return user;
      }
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

  async updateAvatar(id: number, newAvatar: string): Promise<User> {
    const user = await this.findOneById(id);
    user.avatar = newAvatar;
    await this.userRepository.save(user);
    return user;
  }

  async setLocation(
    id: number,
    newlatitude: number,
    newlongitude: number,
  ): Promise<User> {
    const user = await this.findOneById(id);
    user.latitude = newlatitude;
    user.longitude = newlongitude;
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

  async delete(id: number): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }
}
