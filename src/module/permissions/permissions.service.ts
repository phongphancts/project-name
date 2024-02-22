import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { acceptPermissionDto } from './dto/accpetPer.dto';

@Injectable()
export class PermissionsService {


    constructor(private prisma: PrismaService){}


    async acceptPermission(acceptPerDto: acceptPermissionDto) {
      try {
        const {role_id, permissions_id, action_id} = acceptPerDto
          const accept = await this.prisma.rolePermission.create({
              data: {
                role_id,
                permission_id: permissions_id,
                action_id
              }
          });
         
          return accept;
      } catch (error) {
          // Handle any potential errors
          console.error("Error accepting permission:", error);
          throw error; // Rethrow the error or handle it accordingly
      }
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

      async getUserPermissions2(role_id: any, permission_id: any, action_id: any) {
        try {
          const userPermissions = await this.prisma.rolePermission .findMany({
            where: {
                role_id,
                permission_id,
                action_id,
            }
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


