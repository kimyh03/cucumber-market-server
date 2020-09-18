import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationId,
  Column,
  CreateDateColumn,
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

  @Field()
  @ManyToOne(() => User, (user) => user.chatsAsSeller)
  seller: User;

  @Field(() => Number)
  @RelationId((chat: Chat) => chat.seller)
  @Column()
  sellerId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.chatsAsBuyer)
  buyer: User;

  @Field(() => Number)
  @RelationId((chat: Chat) => chat.buyer)
  @Column()
  buyerId: number;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.chat, { nullable: true })
  messages: Message[];

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.chats, { nullable: true })
  post: Post;

  @Field(() => Number, { nullable: true })
  @RelationId((chat: Chat) => chat.post)
  @Column()
  postId: number;

  @Field(() => Deal, { nullable: true })
  @OneToOne(() => Deal, (deal) => deal.chat, { nullable: true })
  deal: Deal;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
