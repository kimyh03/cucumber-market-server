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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.dealsAsSeller, { onDelete: 'CASCADE' })
  seller: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.dealsAsBuyer, { onDelete: 'CASCADE' })
  buyer: User;

  @Field(() => Post)
  @OneToOne(() => Post, (post) => post.deal, { onDelete: 'CASCADE' })
  post: Post;
}
