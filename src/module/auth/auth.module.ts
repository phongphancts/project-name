import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[UsersModule,JwtModule.register({
        global: true,
        secret: process.env.accessToken,
        signOptions: { expiresIn: '60s' },
      }), ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, ],
    exports: [AuthService],
})
export class AuthModule {}
