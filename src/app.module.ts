import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { RolesModule } from './module/roles/roles.module';
import { RolesPermissionsModule } from './module/roles_permissions/roles_permissions.module';
import { PermissionsModule } from './module/permissions/permissions.module';
import { RolesPermissionsController } from './module/roles_permissions/roles_permissions.controller';
import { RolesService } from './module/roles/roles.service';
import { RolesController } from './module/roles/roles.controller';
import { PrismaService } from './module/prisma.service';
import { AuthController } from './module/auth/auth.controller';
import { AuthService } from './module/auth/auth.service';
import { AuthModule } from './module/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './thirt-party/stategy/token.stategy';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' })
    ,UsersModule, RolesModule, RolesPermissionsModule, PermissionsModule, AuthModule, PassportModule],
  controllers: [AppController, RolesController, RolesPermissionsController, AuthController],
  providers: [AppService, RolesService, PrismaService,AuthService, JwtStrategy],
})
export class AppModule {}
