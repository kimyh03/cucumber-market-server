import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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
  userName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field()
  @Column()
  phoneNumber: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  verificationCode: number;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  Latitude: number;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  Longitude: number;

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.seller, { nullable: true })
  reviewsAsSeller: Review[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.buyer, { nullable: true })
  reviewsAsBuyer: Review[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user, { nullable: true })
  posts: Post[];

  @Field(() => [Deal], { nullable: true })
  @OneToMany(() => Deal, (deal) => deal.buyer, { nullable: true })
  dealsAsBuyer: Deal[];

  @Field(() => [Deal], { nullable: true })
  @OneToMany(() => Deal, (deal) => deal.seller, { nullable: true })
  dealsAsSeller: Deal[];

  @Field(() => [Chat], { nullable: true })
  @OneToMany(() => Chat, (chat) => chat.seller, { nullable: true })
  chatsAsSeller: Chat[];

  @Field(() => [Chat], { nullable: true })
  @OneToMany(() => Chat, (chat) => chat.buyer, { nullable: true })
  chatsAsBuyer: Chat[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.user, { nullable: true })
  messages: Message[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.user, { nullable: true })
  likes: Like[];
}
