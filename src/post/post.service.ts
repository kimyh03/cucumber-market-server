import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.dto';
import { EditPostInput } from './dto/edit-post.dto';
import { PostStatus } from './dto/postStatusEnum';
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

  async edit(post: Post, args: EditPostInput): Promise<Post> {
    const editedPost = Object.assign(post, args);
    return await this.postRepository.save(editedPost);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOneById(id: number): Promise<Post> {
    return await this.postRepository.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    await this.postRepository.delete(id);
    return true;
  }

  async setStatus(post: Post, status: PostStatus): Promise<Post> {
    post.status = status;
    return await this.postRepository.save(post);
  }
}
