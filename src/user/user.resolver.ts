// import { CreateUserInput } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  /*
  @Mutation(() => User)
  create(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserData);
  }
*/
  @Query(() => [User])
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOne(@Args('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => Boolean)
  remove(@Args('id') id: string): Promise<boolean> {
    return this.userService.remove(id);
  }
}
