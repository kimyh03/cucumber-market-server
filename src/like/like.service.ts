import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async findAll() {
    // for test
    return await this.likeRepository.find();
  }

  async findOneByUserAndPostId(userId: number, postId: number): Promise<Like> {
    const like = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    if (!like) {
      throw new NotFoundException();
    } else {
      return like;
    }
  }

  async isLiked(userId: number, postId: number): Promise<boolean> {
    const isExist = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    if (isExist) {
      return true;
    } else {
      return false;
    }
  }

  async toggle(userId: number, postId: number): Promise<string> {
    const isLiked = await this.isLiked(userId, postId);
    if (isLiked) {
      const existLike = await this.findOneByUserAndPostId(userId, postId);
      await this.likeRepository.delete(existLike.id);
      return 'your like is removed.';
    } else {
      const user = await this.userService.findOneById(userId);
      const post = await this.postService.findOneById(postId);
      this.likeRepository.save({ user, post });
      return 'You have a new like now!';
    }
  }

  async findWithPost(userId: number): Promise<Like[]> {
    return await this.likeRepository.find({
      where: { userId },
      relations: ['post'],
    });
  }
}
