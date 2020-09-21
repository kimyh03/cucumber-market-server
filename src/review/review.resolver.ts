import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { currentUser } from 'src/auth/currentUser.decorator';
import { User } from 'src/user/user.entity';
import { createReviewInput } from './dto/create-review.dto';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Resolver('review')
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [Review]) // for test
  async reviews() {
    return await this.reviewService.findAll();
  }

  @Mutation(() => Boolean) // for test
  async deleteReview(@Args('reviewId') reviewId: number) {
    try {
      await this.reviewService.delete(reviewId);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Review)
  async createReview(
    @currentUser('user') user: User,
    @Args('args') args: createReviewInput,
  ) {
    try {
      return await this.reviewService.create(user.id, args);
    } catch (error) {
      throw new Error(error);
    }
  }
}
