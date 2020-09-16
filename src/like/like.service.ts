import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

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
}
