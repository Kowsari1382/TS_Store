import type { NextFunction, Request, Response } from "express";

export interface IProductController {
    findAll(req: Request, res: Response, next: NextFunction): any;
    findByID(req: Request, res: Response, next: NextFunction): any;
    findSomeImgByProductID(req: Request, res: Response, next: NextFunction): any;
    findImgByProductIDPageNumber(req: Request, res: Response, next: NextFunction): any;
    findByProductIDAttributes(req: Request, res: Response, next: NextFunction): any;
    findByProductname(req: Request, res: Response, next: NextFunction): any;
    findByCategory(req: Request, res: Response, next: NextFunction): any;
    Add(req: Request, res: Response, next: NextFunction): any;
    Update(req: Request, res: Response, next: NextFunction): any;
    setScore(req: Request, res: Response, next: NextFunction): any;
    Delete(req: Request, res: Response, next: NextFunction): any;
    AddImg(req: Request, res: Response, next: NextFunction): any;
    UpdateImg(req: Request, res: Response, next: NextFunction): any;
    DeleteImg(req: Request, res: Response, next: NextFunction): any;
}