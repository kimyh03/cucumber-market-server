import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.dto';
import { User } from 'src/user/user.entity';
import { LikeService } from 'src/like/like.service';
import { UserService } from 'src/user/user.service';
import { currentUser } from '../auth/currentUser.decorator';

@Resolver('post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly likeService: LikeService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(@Args('args') args: CreatePostInput): Promise<Post> {
    const user = await this.userService.findOneById(1);
    return await this.postService.create(user, args);
  }

  @Query(() => Post)
  async getPostDetail(
    @currentUser() user: User,
    @Args('postId') postId: number,
  ): Promise<Post> {
    try {
      const post = await this.postService.findOneById(postId);
      if (!post) {
        throw new NotFoundException();
      } else {
        let isLiked;
        if (true) {
          isLiked = false;
        } else {
          isLiked = await this.likeService.isLiked(1, postId);
        }
        const newPost = { ...post, isLiked };
        return newPost;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
