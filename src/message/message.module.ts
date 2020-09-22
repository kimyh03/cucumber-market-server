import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/chat/chat.entity';
import { ChatService } from 'src/chat/chat.service';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Message } from './message.entity';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Chat, Post])],
  providers: [
    MessageResolver,
    MessageService,
    UserService,
    ChatService,
    PostService,
  ],
})
export class MessageModule {}
