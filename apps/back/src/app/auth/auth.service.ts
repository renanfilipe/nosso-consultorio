import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../users/user.entity'
import { UsersService } from '../users/user.service'
import { JwtToken, OAuthUser } from './auth.interfaces'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.validatePassword(password)) {
      return user;
    }

    return null;
  }

  login(user: User): JwtToken {
    return this.generateJwtToken(user);
  }

  async googleLogin(oAuthUser: OAuthUser): Promise<OAuthUser | JwtToken> {
    const { oAuthId, oAuthProvider } = oAuthUser;
    const user = await this.usersService.findOneByOAuth(oAuthId, oAuthProvider);
    if (!user) {
      return oAuthUser;
    }

    return this.generateJwtToken(user);
  }

  private generateJwtToken(user: User): JwtToken {
    const payload = { username: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
