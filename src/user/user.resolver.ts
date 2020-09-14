import { CreateUserInput } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/auth/auth.decorator';

@Resolver('user')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [User]) // for test
  async users() {
    return await this.userService.findAll();
  }

  @Query(() => User) // for test
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }

  @Mutation(() => Boolean) // for test
  async removeUser(@Args('id') id: number): Promise<boolean> {
    try {
      await this.userService.remove(id);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => String)
  async logIn(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const authPayload = await this.authService.validateUser(username, password);
    const token = await this.authService.login(authPayload);
    return token;
  }

  @Mutation(() => String)
  async createUser(@Args('args') args: CreateUserInput): Promise<string> {
    try {
      const existUser = await this.userService.findOneByUsername(args.username);
      if (existUser) {
        throw new Error('Sorry, This user name is already taken.');
      } else {
        await this.userService.create(args);
        const authPayload = await this.authService.validateUser(
          args.username,
          args.password,
        );
        const token = await this.authService.login(authPayload);
        return token;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getUserProfile(@Args('id') id: number): Promise<User> {
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateAvatar(
    @CurrentUser() currentUser: User,
    @Args('avatar') avatar: string,
  ): Promise<User> {
    try {
      const user = await this.userService.findOneById(currentUser.id);
      const updatedUser = this.userService.updateAvatar(user, avatar);
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async setLocation(
    @CurrentUser() currentUser: User,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
  ): Promise<User> {
    try {
      const user = await this.userService.findOneById(currentUser.id);
      const updatedUser = this.userService.setLocation(
        user,
        latitude,
        longitude,
      );
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
