import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  BaseEntity,
  RelationId,
} from 'typeorm';
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';
import { WriterTypeEnum } from './dto/writerTypeEnum';

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

  @Field(() => Number)
  @RelationId((review: Review) => review.writer)
  @Column()
  writerId: number;

  @Field(() => WriterTypeEnum)
  @Column({ type: 'enum', enum: WriterTypeEnum })
  writerType: WriterTypeEnum;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviewsAsRecipient, {
    onDelete: 'CASCADE',
  })
  recipient: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.reviews)
  post: Post;

  @Field(() => Number)
  @RelationId((review: Review) => review.post)
  @Column()
  postId: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
