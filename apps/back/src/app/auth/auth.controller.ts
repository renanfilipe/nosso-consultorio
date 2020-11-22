import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { JwtToken, OAuthUser } from './auth.interfaces'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './googleAuth.guard'
import { LocalAuthGuard } from './localAuth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<JwtToken> {
    return this.authService.login(req.user);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth(): void {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req): Promise<OAuthUser | JwtToken> {
    return this.authService.googleLogin(req.user);
  }
}
