import { SetMetadata } from "@nestjs/common"


export enum Action{
    USER = 1,
    ROLE = 2,
    Permission = 3
}

export const  ACTION_KEY =  'action'
export const Action_Required = (...actions:Action[])=> SetMetadata(ACTION_KEY, actions)


