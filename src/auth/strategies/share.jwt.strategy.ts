import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { shareJWTClaim } from '../dto/sharejwt-claim.dto'; 


@Injectable()
export class ShareJwtAuthGuard extends AuthGuard('sharejwt') {}


@Injectable()
export class ShareJwtStrategy extends PassportStrategy(Strategy, "sharejwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: "new secret",
    });
  }

  async validate(claim: shareJWTClaim):Promise<shareJWTClaim> {
    return claim;
  }

}