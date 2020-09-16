import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  Column,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';

@ObjectType()
@Entity()
export class Like {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => Number)
  @RelationId((like: Like) => like.user)
  @Column()
  userId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' })
  post: Post;

  @Field(() => Number)
  @RelationId((like: Like) => like.post)
  @Column()
  postId: number;
}
