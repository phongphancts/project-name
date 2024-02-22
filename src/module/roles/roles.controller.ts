import { Controller, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Role } from '.prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/thirt-party/guard/AuthGuard';
import { PermissionsGuard } from 'src/thirt-party/guard/Permission.Guard';
import { Permissions_Required, Permissions } from 'src/thirt-party/decorator/permission.decorator';
import { Action, Action_Required } from 'src/thirt-party/decorator/action.decorator';

@ApiTags('Roles')
@Controller('roles')
@ApiBearerAuth()
export class RolesController {

    constructor(private readonly roleService: RolesService){}

    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.CREATE)
    @Action_Required(Action.ROLE)
    @Post()
    async createRole(@Body() data: Role): Promise<Role> {
      return this.roleService.createRoles(data);
    }
  
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.READ)
    @Action_Required(Action.ROLE)
    @Get(':id')
    async getRoleById(@Param('id') id: string): Promise<Role | null> {
      return this.roleService.getRole(Number(id));
    }

    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.READ)
    @Action_Required(Action.ROLE)
    @Get()
    async getRoles(): Promise<Role[]> {
      return this.roleService.getAllRoles();
    }

    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.UPDATE)
    @Action_Required(Action.ROLE)
    @Put(':id')
    async updateRole(@Param('id') id: string, @Body() data: Role): Promise<Role> {
      return this.roleService.updateRoles({ where: { role_id: Number(id) }, data });
    }
  
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.UPDATE)
    @Action_Required(Action.ROLE)
    @Delete(':id')
    async deleteRole(@Param('id') id: string): Promise<Role> {
      return this.roleService.deleteRole({ role_id: Number(id) });
    }











}
