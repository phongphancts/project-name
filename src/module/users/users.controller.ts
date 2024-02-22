import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { User, Prisma } from '.prisma/client';
import { CreateUserDto, CreateUserResponseDataDto, InternalServerErrorDto, ROLE } from './dto/create.user.dto';

import { Permissions, Permissions_Required } from 'src/thirt-party/decorator/permission.decorator';
import { JwtAuthGuard } from 'src/thirt-party/guard/AuthGuard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update.user.dto';
import { Action, Action_Required } from 'src/thirt-party/decorator/action.decorator';
import { PermissionsGuard } from 'src/thirt-party/guard/Permission.Guard';


@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly userService: UsersService){}


    @ApiResponse({
      status: 200,
      description: 'Successful create',
      type: CreateUserResponseDataDto,
    })
    @ApiResponse({
      status: 500,
      description: 'Internal server error',
      type: InternalServerErrorDto,
    })

    @Post()
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.CREATE)
    @Action_Required(Action.USER)
    async createUser(@Body() createUserDTO: CreateUserDto) {
      return this.userService.createUsers(createUserDTO);
    }
  
    
    @Get(':id')
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.READ)
    @Action_Required(Action.USER)
    async getUserById(@Param('id') id: string): Promise<User | null> {
      return await this.userService.getUser(Number(id));
      
    }



    @Put(':id')
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.UPDATE)
    @Action_Required(Action.USER)
    async updateUser(@Param('id') id: Number, @Body() UpdateUserDto: UpdateUserDto): Promise<User> {
      return await this.userService.updateUsers({ where: { user_id: Number(id) },data: UpdateUserDto });
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard,PermissionsGuard)
    @Permissions_Required(Permissions.DELETE)
    @Action_Required(Action.USER)
    async deleteUser(@Param('id') id: string): Promise<User> {
      return await this.userService.deleteUser({ user_id: Number(id) });
    }

}
