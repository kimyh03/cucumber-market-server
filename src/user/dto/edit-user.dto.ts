import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EditUserInput {
  @Field()
  avatar: string;
}
