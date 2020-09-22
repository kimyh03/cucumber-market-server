import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { currentUser } from 'src/auth/currentUser.decorator';
import { User } from 'src/user/user.entity';
import { Message } from './message.entity';
import { MessageService } from './message.service';

const pubsub = new PubSub();

@Resolver('message')
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  async AllMessages() {
    return await this.messageService.findAll();
  }

  @Subscription(() => Message)
  async newMessage() {
    return pubsub.asyncIterator('newMessage');
  }

  @Mutation(() => Message)
  async sendMessage(
    @currentUser('user') user: User,
    @Args('chatId') chatId: number,
    @Args('text') text: string,
  ) {
    const newMessage = await this.messageService.createMessage(
      user.id,
      chatId,
      text,
    );
    pubsub.publish('newMessage', { newMessage: newMessage });
    return newMessage;
  }
}
