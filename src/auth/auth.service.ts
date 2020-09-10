import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userservice: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userservice.findOneByUsername(username);
    if (user?.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<string> {
    const payload = { id: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
