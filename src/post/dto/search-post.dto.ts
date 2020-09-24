import { InputType, Field, registerEnumType, Float } from '@nestjs/graphql';
import { PostCategoryEnum } from './postCategoryEnum';

registerEnumType(PostCategoryEnum, {
  name: 'PostCategoryEnum',
});

@InputType()
export class SearchPostInput {
  @Field()
  searchTerm: string;

  @Field(() => [PostCategoryEnum])
  categories: PostCategoryEnum[];

  @Field(() => Float)
  distance: number;

  @Field()
  cursor: number;
}
