import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNumber, IsDate, IsOptional, IsNotEmpty, MinLength, MaxLength, IsIn } from 'class-validator';



export enum ROLE {
    ADMIN = 1,
    MANAGER = 4,
    MEMBER = 2,
    USER = 3
}

export class CreateUserDto {


    

    @ApiProperty({
        example: 'John Doe',
        description: 'Name of the user',
    })
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;


    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address of the user',
    })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;


    @ApiProperty({
        example: 'securepassword123',
        description: 'Password for the user',
    })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
    password: string;


    

    @ApiProperty({
        example: ROLE.MEMBER,
        description: 'Role of the user',
        enum: ROLE,
    })
    @IsNotEmpty({ message: 'Role is required' })
    @IsIn(Object.values(ROLE), { message: 'Invalid role' })
    role_id: number
}



  
  export class CreateUserResponseDataDto {
    @ApiProperty()
    code: string;
  
    @ApiProperty()
    status: number;
  
    @ApiProperty()
    message: string;
  }


  export class InternalServerErrorDto {
    @ApiProperty()
    code: string;
  
    @ApiProperty()
    status: number;
  
    @ApiProperty()
    message: string;
  }