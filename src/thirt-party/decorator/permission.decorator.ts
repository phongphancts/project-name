import { SetMetadata } from "@nestjs/common"


export enum Permissions{
    CREATE = 1,
    READ = 2,
    UPDATE = 3,
    DELETE = 4
}

export const  PERMISSIONS_KEY =  'permissions'
export const Permissions_Required = (...permissions:Permissions[])=> SetMetadata(PERMISSIONS_KEY, permissions)


