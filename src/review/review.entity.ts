import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Deal } from 'src/deal/deal.entity';

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviewsAsSeller, {
    onDelete: 'CASCADE',
  })
  seller: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviewsAsBuyer, { onDelete: 'CASCADE' })
  buyer: User;

  @Field(() => Deal)
  @OneToOne(() => Deal, (deal) => deal.review)
  deal: Deal;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
