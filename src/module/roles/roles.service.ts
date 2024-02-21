import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role, Prisma } from '@prisma/client';
@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService){}

    async createRoles(data: Prisma.RoleCreateInput): Promise<Role>{
        return this.prisma.role.create({data})
    }

    //Get All Roles
    async getAllRoles(): Promise<Role[]> {
        return this.prisma.role.findMany();
      }


    //get 1 Role 
    async getRole(id: number): Promise<Role | null>{
        return this.prisma.role.findUnique({where: {role_id: id }})
    }


    async  updateRoles(params:{
        where: Prisma.RoleWhereUniqueInput;
        data: Prisma.RoleUpdateInput;
    }):Promise<Role>{
        const {where, data} = params
        return this.prisma.role.update({where, data})
    }

    
    
    async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
        return this.prisma.role.delete({
          where,
        });
      }
}
