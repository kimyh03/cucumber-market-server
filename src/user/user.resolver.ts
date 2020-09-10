import { CreateUserInput } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { EditUserInput } from './dto/edit-user.dto';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/auth/auth.decorator';

@Resolver('user')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [User])
  async users() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }

  @Query(() => String)
  async logIn(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const authPayload = await this.authService.validateUser(username, password);
    return await this.authService.login(authPayload);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id') id: string): Promise<boolean> {
    try {
      await this.userService.remove(id);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => String)
  async createUser(@Args('args') args: CreateUserInput): Promise<string> {
    try {
      const existUser = await this.userService.findOneByUsername(args.username);
      console.log(existUser);
      if (existUser) {
        throw new Error('Sorry, This user name is already taken.');
      } else {
        await this.userService.create(args);
        return 'token comming soon';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getUserProfile(@Args('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findOneById(id, [
        'reviewsAsRecipient',
        'posts',
      ]);
      if (!user) {
        throw new NotFoundException();
      } else {
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => User)
  async editUserProfile(
    @Args('id') id: string,
    @Args('args') args: EditUserInput,
  ): Promise<User> {
    try {
      const user = await this.userService.findOneById(id);
      if (!user) {
        throw new NotFoundException();
      } else {
        const updatedUser = this.userService.edit(user, args);
        return updatedUser;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
