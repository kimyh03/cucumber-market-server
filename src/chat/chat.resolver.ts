import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { currentUser } from 'src/auth/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/user.entity';
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat)
  async getChatRoomInPost(
    @currentUser('user') user: User,
    @Args('postId') postId: number,
  ): Promise<Chat> {
    try {
      return await this.chatService.getRoom(user.id, postId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Chat])
  async getChatsList(@currentUser('user') user: User) {
    try {
      return await this.chatService.findAllByUserId(user.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
