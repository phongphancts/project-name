import { SetMetadata } from "@nestjs/common"


export enum Role{
    ADMIN = 'Admin',
    MEMBER = 'Member',
    USER = 'User',
    MANAGER = 'Manager'
}

export const  ROLES_KEY =  'roles'
export const Roles_Required = (...roles:Role[])=> SetMetadata(ROLES_KEY, roles)


