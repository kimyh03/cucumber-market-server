import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Post])],
  providers: [ChatService, ChatResolver, UserService, PostService],
})
export class ChatModule {}
