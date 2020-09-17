import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { currentUser } from 'src/auth/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Like } from './like.entity';
import { LikeService } from './like.service';

@Resolver('like')
export class LikeResolver {
  constructor(
    private readonly postService: PostService,
    private readonly likeService: LikeService,
    private readonly userService: UserService,
  ) {}

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
      const userInstance = await this.userService.findOneById(user.id);
      const postInstance = await this.postService.findOneById(postId);
      return await this.likeService.toggleLike(userInstance, postInstance);
    } catch (error) {
      throw new Error(error);
    }
  }
}
