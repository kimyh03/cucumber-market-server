import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { PostCategoryEnum } from './postCategoryEnum';

registerEnumType(PostCategoryEnum, {
  name: 'PostCategoryEnum',
});

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field(() => PostCategoryEnum)
  category: PostCategoryEnum;

  @Field(() => [String])
  pictures: string[];

  @Field()
  descrioption: string;
}
