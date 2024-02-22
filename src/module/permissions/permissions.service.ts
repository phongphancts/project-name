import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PermissionsService {


    constructor(private prisma: PrismaService){}


    async acceptPermission(role_id: number, permission_id: number, action_id: number) {
        
        const accept =  await  this.prisma.rolePermission.create({
            data: {
                role_id: role_id,
                permission_id: permission_id,
                action_id: action_id
            }
        });
        console.log(accept);
    //     return accept
    }

    async deniedPermission(role_id: number, permission_id: number, action_id: number) {
        const denied =  await this.prisma.rolePermission.deleteMany({
            where: {
                role_id: role_id,
                permission_id: permission_id,
                action_id: action_id
            }
        });
        return denied
    }


    async getUserPermissions(role_id: number) {
        try {
          const userPermissions = await this.prisma.role.findMany({
            where: { role_id},
            include: {
              roles_permissions: true
            },
          });
          if(!userPermissions){
            return []
          }
          const userRolesPermissions = userPermissions.map(userPermission => userPermission.roles_permissions)
          return userRolesPermissions
        } catch (error) {
          console.error('Error fetching user permissions:', error);
          return [];
        }
      }

      async getUserPermissions2(role_id: number, permission_id: number, action_id: number) {
        try {
          const userPermissions = await this.prisma.role.findMany({
            where: {
                role_id,
                roles_permissions: {
                    every: {
                        permission_id,
                        action_id
                    }
                }
            },
            include: {
                roles_permissions: true
            },
        });
          if(!userPermissions){
            return []
          }
          return userPermissions
        } catch (error) {
          console.error('Error fetching user permissions:', error);
          return [];
        }
      }
    
}


