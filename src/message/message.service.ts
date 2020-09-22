import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    private readonly userService: UserService,
    private readonly chatService: ChatService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll() {
    return await this.messageRepository.find();
  }

  async findOneById(id: number) {
    return await this.messageRepository.findOne(id);
  }

  async createMessage(userId: number, chatId: number, text: string) {
    const user = await this.userService.findOneById(userId);
    const chat = await this.chatService.findOneById(chatId);
    if (!user || !chat) {
      throw new NotFoundException();
    } else {
      const newMessage = this.messageRepository.create({
        user,
        chat,
        text,
      });
      await this.messageRepository.save(newMessage);
      return await this.findOneById(newMessage.id);
    }
  }
}
