import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Review } from './review.entity';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Post])],
  providers: [ReviewResolver, ReviewService, UserService, PostService],
  exports: [ReviewService],
})
export class ReviewModule {}
