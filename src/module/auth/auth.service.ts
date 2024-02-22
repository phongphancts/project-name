import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { ErrorCustom } from 'src/commom/error.custom';
import { ERROR_RESPONSE } from 'src/commom/error.handle';
import { CreateUserDto } from './dto/create_account.dto';
import { User } from '@prisma/client';

@Injectable()


export class AuthService {

    constructor(private prisma: PrismaService,
    private readonly  jwtService: JwtService){}
    

    async login(email: string, password: string) {
        const dataUser = await this.findOne(email)
        
        if (!dataUser) {
          throw new ErrorCustom(ERROR_RESPONSE.UserNotExits)
        }
       
        const isPasswordValid = await bcrypt.compare(password, dataUser.password);

        
        if (!isPasswordValid) {
          throw new ErrorCustom(ERROR_RESPONSE.PasswordNotExits)
        }
      
    
         const accessToken = await this.generateAccessToken(email, dataUser.user_id, dataUser.role_id);
         const refreshToken = await this.generateRefreshToken(email, dataUser.user_id,dataUser.role_id);
    
        
        return {
          statusCode: 200,
          data: {
            name: dataUser.name,
            user_id: dataUser.user_id,
            role_user: dataUser.role.name,
            access_token: accessToken,
            refresh_token: refreshToken
          }
        }
      }

      async signUp(createAccount: CreateUserDto){
        const {name , email, password, role_id} = createAccount
        const checkEmail = await this.findUserByEmail(email)
        if(checkEmail){
            throw new ErrorCustom(ERROR_RESPONSE.ValidIsEmail)
        }
        const hashPassword   = await this.hashPassord(password)
           
        return this.prisma.user.create({
            data:{
                name,
                email,
                password: hashPassword,
                role_id
            }
            
        })
      }


      async hashPassord(password: string) {
        if (password) {
          return await bcrypt.hash(password, 10)
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
      return this.prisma.user.findUnique({
        where: { email },
      });
    }


      async findOne(email: string) {
        try {
            return this.prisma.user.findUnique({
                where: { email },
                include:{
                    role:true,
                }
              });
        } catch (error) {
          throw new Error("Database error")
        }
      }

      

      generateAccessToken(email: string, id: number, role_id: number): Promise<string> {
        const secret: string = process.env.accessToken
        const payload = {
          role_id,
          email,
          id
        };
        const expiresInAccessToken = '1d'
    
        let expiresIn = expiresInAccessToken;
        return this.jwtService.signAsync(payload, {
          expiresIn: expiresIn,
          secret,
        });
      }
      generateRefreshToken(email: string, id: number, role_id: number): Promise<string> {
        const secret: string = process.env.refreshToken
        const payload = {
          role_id,
          email,
          id
        };
    
        const expiresInRefeshToken = '2d'
    
        let expiresIn = expiresInRefeshToken;
        return this.jwtService.signAsync(payload, {
          expiresIn: expiresIn,
          secret,
        });
      }
}
