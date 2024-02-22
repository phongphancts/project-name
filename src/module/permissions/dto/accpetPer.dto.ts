import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsNumber, IsDate, IsOptional, IsNotEmpty, MinLength, MaxLength, IsIn } from 'class-validator';



export class acceptPermissionDto {


    @ApiProperty({
        example: '1',
        description: 'Role Id',
    })
    @IsNumber()
    @IsNotEmpty({ message: 'role_id is required' })
    role_id: number;

    @ApiProperty({
        example: '1',
        description: 'permissions_id',
    })
    @IsNumber()
    @IsNotEmpty({ message: 'permissions_id is required' })
    permissions_id: number;


    @ApiProperty({
        example: '1',
        description: 'action_id',
    })
    @IsNumber()
    @IsNotEmpty({ message: 'action_id is required' })
    action_id: number;



}
