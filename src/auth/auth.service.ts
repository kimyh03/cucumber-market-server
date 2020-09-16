import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

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

  async createJWT(userId: string): Promise<string> {
    return this.jwtService.sign(userId);
  }

  async decodeJWT(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }
}
