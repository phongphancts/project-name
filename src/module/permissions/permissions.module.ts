import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PrismaService } from '../prisma.service';


@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService],
  imports: []
})
export class PermissionsModule {}
