import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';

@ObjectType()
@Entity()
export class Like {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;
}
