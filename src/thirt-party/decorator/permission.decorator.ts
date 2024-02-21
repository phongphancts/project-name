import { SetMetadata } from "@nestjs/common"


export enum Permissions_Enum{
    CREATE = 'Create',
    RENDER = 'Read',
    UPDATE = 'Update',
    DELETE = 'Delete'
}

export const  PERMISSIONS_KEY =  'permissions'
export const Permissions_Required = (...permissions:Permissions_Enum[])=> SetMetadata(PERMISSIONS_KEY, permissions)


