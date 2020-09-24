import {
  Resolver,
  Mutation,
  Query,
  Args,
  registerEnumType,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.dto';
import { User } from 'src/user/user.entity';
import { LikeService } from 'src/like/like.service';
import { currentUser } from '../auth/currentUser.decorator';
import { EditPostInput } from './dto/edit-post.dto';
import { PostStatusEnum } from './dto/PostStatusEnum';
import { SearchPostInput } from './dto/search-post.dto';

registerEnumType(PostStatusEnum, {
  name: 'PostStatusEnum',
});

@Resolver('post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly likeService: LikeService,
  ) {}

  @Query(() => [Post])
  async findAllPosts() {
    return await this.postService.findAll();
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: number) {
    return await this.postService.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Post])
  async getPosts(
    @currentUser() user: User,
    @Args('searchPostInput') searchPostInput: SearchPostInput,
  ): Promise<Post[]> {
    try {
      return await this.postService.findBySearchTerm(user.id, searchPostInput);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @currentUser() user: User,
    @Args('args') args: CreatePostInput,
  ): Promise<Post> {
    try {
      return await this.postService.create(user.id, args);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => Post)
  async getPostDetail(
    @currentUser() user: User,
    @Args('postId') postId: number,
  ): Promise<Post> {
    try {
      const post = await this.postService.findOneById(postId);
      let isLiked: boolean;
      if (!user) {
        isLiked = false;
      } else {
        isLiked = await this.likeService.isLiked(user.id, postId);
      }
      const newPost = { ...post, isLiked };
      return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async editPost(
    @currentUser('user') user: User,
    @Args('postId') postId: number,
    @Args('args') args: EditPostInput,
  ): Promise<Post> {
    try {
      const post = await this.postService.edit(user.id, postId, args);
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async setPostStatus(
    @currentUser('user') user: User,
    @Args('postId') postId: number,
    @Args('status') status: PostStatusEnum,
  ): Promise<Post> {
    try {
      const post = await this.postService.setStatus(user.id, postId, status);
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Post])
  async getMySalesList(
    @currentUser('user') user: User,
    @Args('status') status: PostStatusEnum,
  ): Promise<Post[]> {
    try {
      return await this.postService.findByStatus(user.id, status);
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Post])
  async getMyPurchasesList(@currentUser('user') user: User): Promise<Post[]> {
    try {
      return await this.postService.findPurchases(user.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
