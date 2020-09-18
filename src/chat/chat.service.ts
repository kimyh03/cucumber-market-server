import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOneById(chatId: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['post', 'messages', 'deals'],
    });
    if (!chat) {
      throw new NotFoundException();
    } else {
      return chat;
    }
  }

  async findOneByUserIdAndPostId(
    userId: number,
    postId: number,
  ): Promise<Chat> {
    return await this.chatRepository.findOne({
      where: [
        { sellerId: userId, postId },
        { buyerId: userId, postId },
      ],
      relations: ['post', 'messages', 'deals'],
    });
  }

  async create(userId: number, postId: number): Promise<Chat> {
    const post = await this.postService.findOneById(postId);
    const requestUser = await this.userService.findOneById(userId);
    const seller = await this.userService.findOneById(post.sellerId);
    if (requestUser.id === seller.id) {
      throw new Error("You can't make a chat on your post");
    } else {
      const newChat = await this.chatRepository.save({
        post,
        seller,
        buyer: requestUser,
      });
      return await this.findOneById(newChat.id);
    }
  }

  async isExist(userId: number, postId: number): Promise<boolean> {
    const existChat = await this.chatRepository.findOne({
      where: [
        { postId, sellerId: userId },
        { postId, buyerId: userId },
      ],
    });
    if (existChat) {
      return true;
    } else {
      return false;
    }
  }

  async getRoom(userId: number, postId: number): Promise<any> {
    const existChat = await this.isExist(userId, postId);
    if (existChat) {
      return await this.findOneByUserIdAndPostId(userId, postId);
    } else {
      return await this.create(userId, postId);
    }
  }
}
