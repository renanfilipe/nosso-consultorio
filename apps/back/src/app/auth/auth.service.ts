import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.validatePassword(password)) {
      return user;
    }

    return null;
  }
}
