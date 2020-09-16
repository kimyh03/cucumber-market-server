import { InputType, Field } from '@nestjs/graphql';
import { PostCategory } from './postCategoryEnum';

@InputType()
export class EditPostInput {
  @Field()
  title: string;

  @Field()
  category: PostCategory;

  @Field()
  pictures: string[];

  @Field()
  descrioption: string;
}
