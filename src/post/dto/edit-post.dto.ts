import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { PostCategoryEnum } from './postCategoryEnum';

registerEnumType(PostCategoryEnum, {
  name: 'PostCategoryEnum',
});

@InputType()
export class EditPostInput {
  @Field()
  title: string;

  @Field(() => PostCategoryEnum)
  category: PostCategoryEnum;

  @Field()
  pictures: string[];

  @Field()
  descrioption: string;
}
