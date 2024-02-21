import { HttpException } from "@nestjs/common";
import { IErrorResponse } from "./error.handle";


export class ErrorCustom extends HttpException {
    constructor(err: IErrorResponse, data?: any) {
        super(err, err.statusCode)

    }
}


