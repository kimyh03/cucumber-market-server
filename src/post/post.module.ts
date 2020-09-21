import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { LikeModule } from 'src/like/like.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), LikeModule, UserModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
