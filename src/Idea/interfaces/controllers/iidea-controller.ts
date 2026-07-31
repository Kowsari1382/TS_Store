import type { NextFunction, Request, Response } from "express";

export interface IIdeaController{
    findAll(req: Request, res: Response, next: NextFunction): any;
    findByID(req: Request, res: Response, next: NextFunction): any;
    findByUserID(req: Request, res: Response, next: NextFunction): any;
    findByProductID(req: Request, res: Response, next: NextFunction): any;
    findByUserProductID(req: Request, res: Response, next: NextFunction): any;
    Add(req: Request, res: Response, next: NextFunction): any;
    Update(req: Request, res: Response, next: NextFunction): any;
    Delete(req: Request, res: Response, next: NextFunction): any;
}