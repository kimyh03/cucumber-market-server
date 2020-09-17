import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async findAll() {
    return await this.likeRepository.find();
  }

  async isLiked(userId: number, postId: number): Promise<boolean> {
    const existLike = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    if (existLike) {
      return true;
    } else {
      return false;
    }
  }

  async toggleLike(user: User, post: Post): Promise<string> {
    const existLike = await this.likeRepository.findOne({
      where: { userId: user.id, postId: post.id },
    });
    if (existLike) {
      await this.likeRepository.delete(existLike.id);
      return 'your like is removed.';
    } else {
      this.likeRepository.save({ user, post });
      return 'You have a new like now!';
    }
  }
}
