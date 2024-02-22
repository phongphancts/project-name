import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ACTION_KEY, Action } from '../decorator/action.decorator';
import { PERMISSIONS_KEY, Permissions } from '../decorator/permission.decorator';

import { log } from 'console';
import { PrismaService } from 'src/module/prisma.service';
import { PermissionsService } from 'src/module/permissions/permissions.service';


@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector,
                private prisma: PermissionsService) { }

    async canActivate(context: ExecutionContext) {
        const requiredActions = this.reflector.getAllAndOverride<Action[]>(ACTION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const requiredPermissions: Permissions[] = this.reflector.getAllAndOverride<Permissions[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (!requiredActions) {
            return true;
        }

        if (!requiredPermissions) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user
        const role_idUser = user.role_id

        const userPermissions = await this.prisma.getUserPermissions(role_idUser)
   
        const allowed = userPermissions.some( up => up.some(allow => 
            requiredPermissions.includes(allow.permission_id) && requiredActions.includes(allow.action_id)))
            
         return allowed;
        
    }
}