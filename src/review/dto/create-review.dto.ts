import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { WriterTypeEnum } from './writerTypeEnum';

registerEnumType(WriterTypeEnum, {
  name: 'WriterTypeEnum',
});

@InputType()
export class createReviewInput {
  @Field(() => WriterTypeEnum)
  writerType: WriterTypeEnum;

  @Field()
  recipientId: number;

  @Field()
  postId: number;

  @Field()
  text: string;

  @Field()
  rating: number;
}
