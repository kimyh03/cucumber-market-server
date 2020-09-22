import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Chat } from 'src/chat/chat.entity';

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.messages, { nullable: true })
  user: User;

  @Field(() => Number)
  @RelationId((message: Message) => message.user)
  @Column()
  userId: number;

  @Field(() => Chat)
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  chat: Chat;

  @Field(() => Number)
  @RelationId((message: Message) => message.chat)
  @Column()
  chatId: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
