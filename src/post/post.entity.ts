import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Like } from 'src/like/like.entity';
import { Chat } from 'src/chat/chat.entity';
import { Deal } from 'src/deal/deal.entity';
import { PostStatus } from './dto/postStatusEnum';
import { PostCategory, PostCategoryArray } from './dto/postCategoryEnum';

enum PostCategoryEnum {
  Digital,
  Funiture,
  Living,
  Sports,
  Beauty,
  Fashion,
  Pet,
  Others,
}
registerEnumType(PostCategoryEnum, {
  name: 'PostCategoryEnum',
});

enum PostStatusEnum {
  OnSale,
  SoldOut,
  Hidden,
}
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

  @Field(() => PostStatusEnum)
  @Column({
    type: 'enum',
    enum: ['OnSale', 'SoldOut', 'Hidden'],
    default: 'OnSale',
  })
  status: PostStatus;

  @Field(() => PostCategoryEnum)
  @Column({ type: 'enum', enum: [...PostCategoryArray] })
  category: PostCategory;

  @Field()
  @Column()
  descrioption: string;

  @Field(() => [String])
  @Column({ type: 'simple-array' })
  pictures: string[];

  @Field()
  @Column({ default: 0 })
  viewCount: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => [Chat], { nullable: true })
  @OneToMany(() => Chat, (chat) => chat.post, { nullable: true })
  chats: Chat[];

  @Field(() => Deal, { nullable: true })
  @OneToOne(() => Deal, (deal) => deal.post, { nullable: true })
  deal: Deal;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.post, { nullable: true })
  likes: Like[];
}
