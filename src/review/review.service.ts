import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createReviewInput } from './dto/create-review.dto';
import { WriterTypeEnum } from './dto/writerTypeEnum';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find();
  }

  async findOneById(reviewId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne(reviewId);
    if (review) {
      return review;
    } else {
      throw new NotFoundException();
    }
  }

  async delete(reviewId: number): Promise<string> {
    const review = await this.findOneById(reviewId);
    await this.reviewRepository.delete(review.id);
    return 'The review is deleted!';
  }

  async findOneByUserIdAndPostId(
    writerId: number,
    postId: number,
  ): Promise<Review> {
    return await this.reviewRepository.findOne({ where: { writerId, postId } });
  }

  async isReviewd(writerId: number, postId: number): Promise<boolean> {
    const existReview = await this.findOneByUserIdAndPostId(writerId, postId);
    if (existReview) {
      return true;
    } else {
      return false;
    }
  }

  async create(
    requestUserId: number,
    args: createReviewInput,
  ): Promise<Review> {
    const { writerType, recipientId, postId, text, rating } = args;
    const isReviewd = await this.isReviewd(requestUserId, postId);
    if (isReviewd) {
      throw new Error('You already reviewd the post');
    } else {
      const writer = await this.userService.findOneById(requestUserId);
      const recipient = await this.userService.findOneById(recipientId);
      const post = await this.postService.findOneById(postId, ['buyers']);
      if (args.writerType === WriterTypeEnum.Buyer) {
        if (recipientId !== post.sellerId) {
          throw new Error('He/She are not selling the item on the post');
        } else {
          post.buyers = [...post.buyers, writer];
          await this.postRepository.save(post);
        }
      } else {
        if (requestUserId !== post.sellerId) {
          throw new Error('You are not selling the item on the post');
        }
      }
      return await this.reviewRepository.save({
        writer,
        writerType,
        recipient,
        post,
        text,
        rating,
      });
    }
  }
}
