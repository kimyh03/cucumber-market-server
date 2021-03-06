import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  RelationId,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Like } from 'src/like/like.entity';
import { Chat } from 'src/chat/chat.entity';
import { Review } from 'src/review/review.entity';
import { PostCategoryEnum } from './dto/postCategoryEnum';
import { PostStatusEnum } from './dto/PostStatusEnum';

registerEnumType(PostCategoryEnum, {
  name: 'PostCategoryEnum',
});

registerEnumType(PostStatusEnum, {
  name: 'PostStatusEnum',
});

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => PostCategoryEnum)
  @Column({
    type: 'enum',
    enum: PostCategoryEnum,
  })
  category: PostCategoryEnum;

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  pictures: string[];

  @Field()
  @Column()
  description: string;

  @Field(() => PostStatusEnum)
  @Column({
    type: 'enum',
    enum: PostStatusEnum,
    default: 'OnSale',
  })
  status: PostStatusEnum;

  @Field()
  @Column({ default: 0 })
  viewCount: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.postsAsSeller, { onDelete: 'CASCADE' })
  seller: User;

  @Field(() => Number)
  @RelationId((post: Post) => post.seller)
  @Column()
  sellerId: number;

  @Field(() => User, { nullable: true })
  @ManyToMany(() => User, (user) => user.postsAsBuyer, { nullable: true })
  @JoinTable()
  buyers: User[];

  @Field(() => [Number], { nullable: true })
  @RelationId((post: Post) => post.buyers)
  @Column({ type: 'simple-array', nullable: true })
  buyersId: number[];

  @Field(() => [Chat], { nullable: true })
  @OneToMany(() => Chat, (chat) => chat.post, { nullable: true })
  chats: Chat[];

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.post, { nullable: true })
  likes: Like[];

  @Field(() => [Review], { nullable: true })
  @OneToMany(() => Review, (review) => review.post, { nullable: true })
  reviews: Review[];

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field({ nullable: true })
  isLiked: boolean;
}
