import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';
import { ReviewService } from 'src/review/review.service';
import { Review } from 'src/review/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Post, Review])],
  providers: [
    ChatService,
    ChatResolver,
    UserService,
    PostService,
    ReviewService,
  ],
  exports: [ChatService],
})
export class ChatModule {}
