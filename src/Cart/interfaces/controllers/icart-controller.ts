import type { NextFunction, Request, Response } from "express";

export interface ICartController{
    findAll(req: Request, res: Response, next: NextFunction): any;
    findByUserID(req: Request, res: Response, next: NextFunction): any;
    findByProductID(req: Request, res: Response, next: NextFunction): any;
    findByUserProductID(req: Request, res: Response, next: NextFunction): any;
    Add(req: Request, res: Response, next: NextFunction): any;
    Minus(req: Request, res: Response, next: NextFunction): any;
    Delete(req: Request, res: Response, next: NextFunction): any;
    DeleteByUserID(req: Request, res: Response, next: NextFunction): any;
    DeleteByProductID(req: Request, res: Response, next: NextFunction): any;
}