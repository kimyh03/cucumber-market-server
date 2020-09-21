import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { currentUser } from 'src/auth/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReviewService } from 'src/review/review.service';
import { User } from 'src/user/user.entity';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

@Resolver('chat')
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly reviewService: ReviewService,
  ) {}

  @Query(() => [Chat])
  async chats() {
    return await this.chatService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Chat)
  async getChatRoomInList(
    @currentUser('user') user: User,
    @Args('chatId') chatId: number,
  ): Promise<Chat> {
    try {
      const chat = await this.chatService.findOneById(chatId);
      const isReviewed = await this.reviewService.isReviewd(
        user.id,
        chat.postId,
      );
      return { ...chat, isReviewed };
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
      const chat = await this.chatService.getRoom(user.id, postId);
      const isReviewed = await this.reviewService.isReviewd(user.id, postId);
      return { ...chat, isReviewed };
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
