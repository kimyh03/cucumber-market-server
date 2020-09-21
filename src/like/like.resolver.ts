import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { currentUser } from 'src/auth/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/user.entity';
import { Like } from './like.entity';
import { LikeService } from './like.service';

@Resolver('like')
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query(() => [Like]) // for test
  async findAllLikes() {
    return await this.likeService.findAll();
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async toggleLike(
    @currentUser('user') user: User,
    @Args('postId') postId: number,
  ): Promise<string> {
    try {
      return await this.likeService.toggle(user.id, postId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Like])
  async getLikedPosts(@currentUser('user') user: User) {
    try {
      return await this.likeService.findWithPost(user.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
