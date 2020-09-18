import { Resolver, Query, Args } from '@nestjs/graphql';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

@Resolver('chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => [Chat])
  async chats() {
    return await this.chatService.findAll();
  }

  @Query(() => Chat)
  async getChatRoomInList(@Args('chatId') chatId: number): Promise<Chat> {
    try {
      return await this.chatService.findOneById(chatId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
