import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsDate, IsOptional, IsNotEmpty, MinLength, MaxLength, IsIn } from 'class-validator';


export class UpdateUserDto {

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
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
    password: string;


    
}