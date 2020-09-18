import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
  @ManyToOne(() => Chat, (chat) => chat.deals, { onDelete: 'CASCADE' })
  chat: Chat;
}
