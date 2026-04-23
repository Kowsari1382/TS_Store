import type { NextFunction, Request, Response } from "express";

export const TryCatchController = (controller: Function) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        }
        catch (error: any) {
            next(error)
        }
    }
}