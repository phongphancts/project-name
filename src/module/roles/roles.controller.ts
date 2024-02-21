import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Role } from '.prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth()
export class RolesController {

    constructor(private readonly roleService: RolesService){}

    @Post()
    async createRole(@Body() data: Role): Promise<Role> {
      return this.roleService.createRoles(data);
    }
  
    @Get(':id')
    async getRoleById(@Param('id') id: string): Promise<Role | null> {
      return this.roleService.getRole(Number(id));
    }

    @Get()
    async getRoles(): Promise<Role[]> {
      return this.roleService.getAllRoles();
    }

  
    @Put(':id')
    async updateRole(@Param('id') id: string, @Body() data: Role): Promise<Role> {
      return this.roleService.updateRoles({ where: { role_id: Number(id) }, data });
    }
  
    @Delete(':id')
    async deleteRole(@Param('id') id: string): Promise<Role> {
      return this.roleService.deleteRole({ role_id: Number(id) });
    }











}
