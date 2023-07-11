// import { Strategy } from 'passport-local';
// import { AuthGuard, PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';
// import { User } from '@prisma/client';

// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {}

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
//   constructor(private authService: AuthService) {
//     super();
//   }
//   async validate(username: string, password: string): Promise<User> {
//     return await this.authService.signinUser({username, password});
//   }

// }
