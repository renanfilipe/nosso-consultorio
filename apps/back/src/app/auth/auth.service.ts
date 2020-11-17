import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { UserWithoutPassword } from '../users/user.entity'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<UserWithoutPassword> {
    const user = await this.usersService.findOne(username);
    if (user && user.validatePassword(password)) {
      return user;
    }

    return null;
  }
}
