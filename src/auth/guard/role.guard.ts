import { Injectable, CanActivate, createParamDecorator, ExecutionContext, UnauthorizedException, SetMetadata, applyDecorators, UseGuards, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuthGuard } from '@nestjs/passport';
// import { UserRoleEnum } from '@prisma/client';
import { JWTClaim } from '../dto/jwt-claim.dto';


export const Authorized = (authGuard: Type<IAuthGuard>, ...roles:  []) => applyDecorators(
  UseGuards(authGuard),
  SetMetadata('roles', roles),
  UseGuards(RoleGuard)
)

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // console.log({user, requiredRoles})
    return requiredRoles.some((role) => user.role === role);
  }
}

export const AuthorizedClaim = createParamDecorator<unknown, ExecutionContext, JWTClaim>(
  (data: unknown, ctx: ExecutionContext):JWTClaim => {
    const { user:claim }  = ctx.switchToHttp().getRequest();
    return claim;
  },
);