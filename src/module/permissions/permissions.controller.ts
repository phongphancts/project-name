import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { JwtAuthGuard } from 'src/thirt-party/guard/AuthGuard';
import { PermissionsGuard } from 'src/thirt-party/guard/Permission.Guard';
import { Permissions_Required, Permissions } from 'src/thirt-party/decorator/permission.decorator';
import { Action, Action_Required } from 'src/thirt-party/decorator/action.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { acceptPermissionDto } from './dto/accpetPer.dto';
import { deniedPermissionDto } from './dto/deniedPer.dto';

@ApiTags('Permissons')
@Controller('permissions')
@ApiBearerAuth()
export class PermissionsController {

    constructor(private readonly permissionsService: PermissionsService){}


    @Post()
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.CREATE)
    @Action_Required(Action.Permission)
    async acceptPermissions(@Body() acceptPerDto: acceptPermissionDto) {
      return this.permissionsService.acceptPermission(acceptPerDto.role_id, acceptPerDto.permissions_id, acceptPerDto.action_id);
    }

    @Post()
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.DELETE)
    @Action_Required(Action.Permission)
    async deninedPermissions(@Body() deniedPer: deniedPermissionDto) {
      return this.permissionsService.deniedPermission(deniedPer.role_id, deniedPer.permissions_id, deniedPer.action_id);
    }


   
    @Get()
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.READ)
    @Action_Required(Action.Permission)
    async getUserPermissions(@Param('id') id: number) {
      return this.permissionsService.getUserPermissions(id);
    }
}
