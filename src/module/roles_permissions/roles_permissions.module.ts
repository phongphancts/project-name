import { Module } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';

@Module({
  providers: [RolesPermissionsService]
})
export class RolesPermissionsModule {}
