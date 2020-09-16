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
      const { id, username } = user;
      return { id, username };
    }
    return null;
  }

  async issueJWT(payload: string): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async decodeJWT(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }
}
