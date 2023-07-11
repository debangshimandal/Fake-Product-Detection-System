import { Injectable, CanActivate, ExecutionContext, applyDecorators, UseGuards, SetMetadata, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuthGuard } from '@nestjs/passport';
// import { UserPermissionEnum } from '@prisma/client';

export const RequiredPermission = (authGuard: Type<IAuthGuard>, ...permissions:  []) => applyDecorators(
  UseGuards(authGuard),
  SetMetadata('permissions', permissions),
  UseGuards(PermissionGuard)
)

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions || !requiredPermissions.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // console.log({requiredPermissions, user})
    return true;
    return requiredPermissions.every((permission) => user.permissions.indexOf(permission) !== -1);
  }
}