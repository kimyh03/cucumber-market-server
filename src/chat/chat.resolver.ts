import { Resolver, Query } from '@nestjs/graphql';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

@Resolver('chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [Chat])
  async chats() {
    return await this.chatService.findAll();
  }
}
