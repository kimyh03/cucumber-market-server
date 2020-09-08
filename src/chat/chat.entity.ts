import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Message } from 'src/message/message.entity';
import { Post } from 'src/post/post.entity';
import { Deal } from 'src/deal/deal.entity';

@ObjectType()
@Entity()
export class Chat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.chat, { nullable: true })
  messages: Message[];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.chatsAsSeller, { nullable: true })
  seller: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.chatsAsBuyer, { nullable: true })
  buyer: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.chats)
  post: Post;

  @Field(() => Deal, { nullable: true })
  @OneToOne(() => Deal, (deal) => deal.chat, { nullable: true })
  deal: Deal;
}
