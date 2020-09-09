import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Chat } from 'src/chat/chat.entity';
import { User } from 'src/user/user.entity';

@ObjectType()
@Entity()
export class Deal {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.dealsAsPropser)
  proposer: User;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  dateTime: Date;

  @Field(() => Chat)
  @OneToOne(() => Chat, (chat) => chat.deal, { onDelete: 'CASCADE' })
  chat: Chat;
}
