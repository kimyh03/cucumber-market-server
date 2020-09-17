import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.dto';

@InputType()
export class EditPostInput extends PartialType(CreatePostInput) {}
