import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { Review } from 'src/review/review.entity';
import { Post } from 'src/post/post.entity';
import { Chat } from 'src/chat/chat.entity';
import { Message } from 'src/message/message.entity';
import { Like } from 'src/like/like.entity';
import { Deal } from 'src/deal/deal.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  latitude: number;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  longitude: number;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.seller, { nullable: true })
  postsAsSeller: Post[];

  @Field(() => [Post], { nullable: true })
  @ManyToMany(() => Post, (post) => post.buyers, { nullable: true })
  postsAsBuyer: Post[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.recipient, { nullable: true })
  reviewsAsRecipient: Review[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.writer, { nullable: true })
  reviewsAsWriter: Review[];

  @Field(() => [Chat], { nullable: true })
  @ManyToMany(() => Chat, (chat) => chat.paticipants, { nullable: true })
  chats: Chat[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.user, { nullable: true })
  messages: Message[];

  @Field(() => [Deal], { nullable: true })
  @OneToMany(() => Deal, (deal) => deal.proposer, { nullable: true })
  dealsAsPropser: Deal[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.user, { nullable: true })
  likes: Like[];
}
