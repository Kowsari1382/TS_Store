import type { NextFunction, Request, Response } from "express"
import { ErrorClass } from "../utilities/Error.js"

export const ErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof ErrorClass){
        return res.status(error.status).send(error.message)
    }
    return res.status(400).send("Something went wrong!")
}