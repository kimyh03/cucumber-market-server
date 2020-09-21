import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.dto';
import { EditPostInput } from './dto/edit-post.dto';
import { PostStatusEnum } from './dto/postStatusEnum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(userId: number, args: CreatePostInput): Promise<Post> {
    const user = await this.userService.findOneById(userId);
    return await this.postRepository.save({ seller: user, ...args });
  }

  async edit(
    userId: number,
    postId: number,
    args: EditPostInput,
  ): Promise<Post> {
    const post = await this.findOneById(postId);
    if (post.sellerId !== userId) {
      throw new UnauthorizedException();
    } else {
      const editedPost = Object.assign(post, args);
      return await this.postRepository.save(editedPost);
    }
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    if (!posts) {
      throw new NotFoundException();
    } else {
      return posts;
    }
  }

  async findOneById(id: number, relations?: string[]): Promise<Post> {
    if (relations === undefined) {
      const post = await this.postRepository.findOne(id);
      if (!post) {
        throw new NotFoundException();
      } else {
        return post;
      }
    } else {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: [...relations],
      });
      if (!post) {
        throw new NotFoundException();
      } else {
        return post;
      }
    }
  }

  async delete(id: number): Promise<boolean> {
    const post = await this.findOneById(id);
    if (!post) {
      throw new NotFoundException();
    } else {
      await this.postRepository.delete(id);
      return true;
    }
  }

  async setStatus(
    userId: number,
    postId: number,
    status: PostStatusEnum,
  ): Promise<Post> {
    const post = await this.findOneById(postId);
    if (post.sellerId !== userId) {
      throw new UnauthorizedException();
    } else {
      post.status = status;
      return await this.postRepository.save(post);
    }
  }

  async findByStatus(
    sellerId: number,
    status: PostStatusEnum,
  ): Promise<Post[]> {
    return await this.postRepository.find({
      where: { sellerId, status },
    });
  }

  async findPurchases(buyerId: number): Promise<Post[]> {
    const user = await this.userService.findOneById(buyerId, ['postsAsBuyer']);
    return user.postsAsBuyer;
  }
}
