import { InputType, Field } from '@nestjs/graphql';
import { PostCategory } from './postCategoryEnum';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  category: PostCategory;

  @Field(() => [String])
  pictures: string[];

  @Field()
  descrioption: string;
}
