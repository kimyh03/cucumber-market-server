import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
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

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  paticipants: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.chat, { nullable: true })
  messages: Message[];

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.chats, { nullable: true })
  post: Post;

  @Field(() => Deal, { nullable: true })
  @OneToOne(() => Deal, (deal) => deal.chat, { nullable: true })
  deal: Deal;
}
