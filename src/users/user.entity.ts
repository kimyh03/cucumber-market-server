import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;
}
