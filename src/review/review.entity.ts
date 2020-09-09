import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';

enum WriterTypeEnum {
  Seller,
  Buyer,
}
registerEnumType(WriterTypeEnum, {
  name: 'WriterTypeEnum',
});

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  rating: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.reviewsAsWriter, { nullable: true })
  writer: User;

  @Field(() => WriterTypeEnum)
  @Column({ type: 'enum', enum: ['Seller', 'Buyer'] })
  writerType: WriterTypeEnum;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviewsAsRecipient, {
    onDelete: 'CASCADE',
  })
  recipient: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.reviews)
  post: Post;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
