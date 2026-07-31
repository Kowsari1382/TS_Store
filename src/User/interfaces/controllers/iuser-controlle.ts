import type { NextFunction, Request, Response } from "express";

export interface IUserController {
    findAll(req: Request, res: Response, next: NextFunction): any;
    findByID(req: Request, res: Response, next: NextFunction): any;
    findByUsername(req: Request, res: Response, next: NextFunction): any;
    findAvatar(req: Request, res: Response, next: NextFunction): any;
    Register(req: Request, res: Response, next: NextFunction): any;
    Login(req: Request, res: Response, next: NextFunction): any;
    Add(req: Request, res: Response, next: NextFunction): any;
    Update(req: Request, res: Response, next: NextFunction): any;
    Edit(req: Request, res: Response, next: NextFunction): any;
    Delete(req: Request, res: Response, next: NextFunction): any;
    DeleteAvatar(req: Request, res: Response, next: NextFunction): any;
}