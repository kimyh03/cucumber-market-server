import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Like } from './like.entity';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post, User])],
  providers: [LikeService, LikeResolver, PostService, UserService],
  exports: [LikeService],
})
export class LikeModule {}
