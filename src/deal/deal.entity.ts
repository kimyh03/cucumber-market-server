import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';
import { Chat } from 'src/chat/chat.entity';
import { Review } from 'src/review/review.entity';

@ObjectType()
@Entity()
export class Deal {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  adress: string;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  dateTime: string;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  Latitude: number;

  @Field(() => Float)
  @Column({ type: 'float', default: 0 })
  Longitude: number;

  @Field()
  @Column({ default: false })
  agreement: boolean;

  @Field()
  @Column({ default: false })
  isCompleted: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.dealsAsSeller)
  seller: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.dealsAsBuyer)
  buyer: User;

  @Field(() => Post)
  @OneToOne(() => Post, (post) => post.deal, { onDelete: 'CASCADE' })
  post: Post;

  @Field(() => Chat, { nullable: true })
  @OneToOne(() => Chat, (chat) => chat.deal, { nullable: true })
  chat: Chat;

  @Field(() => Review, { nullable: true })
  @OneToOne(() => Review, (review) => review.deal, {
    nullable: true,
  })
  review: Review;
}
