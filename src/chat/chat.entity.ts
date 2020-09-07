import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Message } from 'src/message/message.entity';
import { Post } from 'src/post/post.entity';

@ObjectType()
@Entity()
export class Chat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.chatsAsSeller, { onDelete: 'CASCADE' })
  seller: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.chatsAsBuyer, { onDelete: 'CASCADE' })
  buyer: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.chats, { onDelete: 'CASCADE' })
  post: Post;
}
