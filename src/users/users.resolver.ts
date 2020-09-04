import { CreateUserInput } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';

@Resolver('users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  create(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserData);
  }

  @Query(() => [User])
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  findOne(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => Boolean)
  remove(@Args('id') id: string): Promise<boolean> {
    return this.usersService.remove(id);
  }
}
