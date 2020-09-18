import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    private postService: PostService,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async findAll(): Promise<Chat[]> {
    // for test
    return await this.chatRepository.find();
  }
}
