import { CreateUserInput } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Mutation, Query, Args, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { currentUser } from '../auth/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @UseGuards(GqlAuthGuard)
  @Query(() => User) // for test
  async whoAmI(@currentUser('user') user: User) {
    return user;
  }

  @Mutation(() => Boolean) // for test
  async removeUser(@Args('id') id: number): Promise<boolean> {
    try {
      await this.userService.delete(id);
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
    const payload = await this.authService.validateUser(username, password);
    if (payload) {
      return await this.authService.issueJWT(payload);
    } else {
      return 'Wrong ID or Password';
    }
  }

  @Mutation(() => String)
  async createUser(@Args('args') args: CreateUserInput): Promise<string> {
    try {
      const existUser = await this.userService.findOneByUsername(args.username);
      if (existUser) {
        throw new Error('Sorry, This user name is already taken.');
      } else {
        await this.userService.create(args);
        const payload = await this.authService.validateUser(
          args.username,
          args.password,
        );
        const token = await this.authService.issueJWT(payload);
        return token;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => User)
  async getUserProfile(@Args('id') id: number): Promise<User> {
    try {
      const user = await this.userService.findOneById(id, [
        'reviewsAsRecipient',
        'posts',
      ]);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateAvatar(
    @currentUser('user') user: User,
    @Args('avatar') avatar: string,
  ): Promise<User> {
    try {
      const updatedUser = this.userService.updateAvatar(user.id, avatar);
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async setUserLocation(
    @currentUser('user') user: User,
    @Args('latitude') latitude: number,
    @Args('longitude') longitude: number,
  ): Promise<User> {
    try {
      const updatedUser = this.userService.setLocation(
        user.id,
        latitude,
        longitude,
      );
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
