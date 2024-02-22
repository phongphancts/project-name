import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { PassportModule } from '@nestjs/passport';
import { PermissionsService } from '../permissions/permissions.service';

@Module({
  imports:[PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PermissionsService],
  exports:[UsersService]
})
export class UsersModule {}
