import { Strategy, VerifyCallback } from 'passport-google-oauth20'

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { GoogleProfile } from './auth.interfaces'
import { AuthService } from './auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ['email', 'profile'],
    });
  }

  async validate(...args): Promise<void> {
    const [profile, done] = this.overloadValidate(...args);
    const oAuthUser = {
      name: profile.displayName,
      email: profile.emails[0].value,
      oAuthId: profile.id,
      oAuthProvider: profile.provider,
    };

    done(null, oAuthUser);
  }

  private overloadValidate(...args): [GoogleProfile, VerifyCallback] {
    if (args.length === 4) {
      return [args[2], args[3]];
    } else if (args.length === 5) {
      return [args[3], args[4]];
    } else {
      throw new UnauthorizedException();
    }
  }
}
