import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { User, Prisma } from '.prisma/client';
import { CreateUserDto, ROLE } from './dto/create.user.dto';

import { Permissions_Enum, Permissions_Required } from 'src/thirt-party/decorator/permission.decorator';
import { Role, Roles_Required } from 'src/thirt-party/decorator/roles.decorator';
import { RolesGuard } from 'src/thirt-party/guard/Role.guard';
import { JwtAuthGuard } from 'src/thirt-party/guard/AuthGuard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update.user.dto';


@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly userService: UsersService){}


    @ApiResponse({
      status: 200,
      description: 'Successful create',
      // Define your response schema here
      schema: {
        properties: {
          statusCode: { type: 'number' },
          data: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              status: { type: 'int' },
              messsage: { type: 'string' }
            },
          },
        },
      },
    })
    @ApiResponse({
      status: 500,
      description: 'Internal server error',
      // Define your error response schema here
      schema: {
        properties: {
          code: { type: 'string' },
          status: { type: 'number' },
          message: { type: 'string' },
        },
      },
    })

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles_Required(Role.ADMIN, Role.MANAGER)
    async createUser(@Body() createUserDTO: CreateUserDto) {
      return this.userService.createUsers(createUserDTO);
    }
  
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User | null> {
      return await this.userService.getUser(Number(id));
      
    }




    @Put(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles_Required(Role.ADMIN, Role.MANAGER)
    async updateUser(@Param('id') id: Number, @Body() UpdateUserDto: UpdateUserDto): Promise<User> {
      return await this.userService.updateUsers({ where: { user_id: Number(id) },data: UpdateUserDto });
    }

    @Roles_Required(Role.ADMIN, Role.MANAGER)
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id: string): Promise<User> {
      return await this.userService.deleteUser({ user_id: Number(id) });
    }

}
