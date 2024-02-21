import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { ErrorCustom } from 'src/commom/error.custom';
import { ERROR_RESPONSE } from 'src/commom/error.handle';
import { UpdateUserDto } from './dto/update.user.dto';
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async createUsers(CreateUserDTO: CreateUserDto){
        const {name , email, password, role_id} = CreateUserDTO
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
       


    //get 1 user 
    async getUser(id: number): Promise<User | null>{
        return this.prisma.user.findUnique({where: {user_id: id }})
    }

    //find by Email of user
    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
          where: { email },
        });
      }

    async getManyUsers(pageSize: number, pageNumber: number): Promise<User[]>{
        const skip = pageSize * (pageNumber - 1)
        const take = pageSize
        
        return this.prisma.user.findMany({
            skip,
            take,
        })
    } 
    
    async  updateUsers(params:{where: Prisma.UserWhereUniqueInput;data: UpdateUserDto}):Promise<User>{
        const {where, data} = params
        const checkEmail = await this.findUserByEmail(data.email)
        if(checkEmail){
            throw new ErrorCustom(ERROR_RESPONSE.ValidIsEmail)
        }
        if (data.password) {
            const hashedPassword = await this.hashPassord(data.password);
            data.password = hashedPassword;
          }
          return this.prisma.user.update({ where, data });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
          where,
        });
      }

}
