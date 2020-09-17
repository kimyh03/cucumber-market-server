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
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(user: User, args: CreatePostInput): Promise<Post> {
    return await this.postRepository.save({ user, ...args });
  }

  async edit(
    userId: number,
    postId: number,
    args: EditPostInput,
  ): Promise<Post> {
    const post = await this.findOneById(postId);
    if (post.userId !== userId) {
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

  async findOneById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException();
    } else {
      return post;
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

  async setStatus(postId: number, status: PostStatusEnum): Promise<Post> {
    const post = await this.findOneById(postId);
    post.status = status;
    return await this.postRepository.save(post);
  }
}
