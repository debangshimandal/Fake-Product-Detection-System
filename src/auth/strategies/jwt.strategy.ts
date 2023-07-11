import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { JWTClaim } from '../dto/jwt-claim.dto';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "It is a secret phrase"
    });
  }

  async validate(claim: JWTClaim):Promise<JWTClaim> {
    return claim;
  }

}