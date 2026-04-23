import type { NextFunction, Response } from "express"
import { TryCatchController } from "../utilities/TryCatchController.js"

export const CheckAdmin = TryCatchController(async(req: any, res: Response, next: NextFunction) => {
    if(req.UserData.Role === 'User'){
        return res.status(403).send('Acceess is denied.');
    }
    else if(req.UserData.Role === 'Admin'){
        next();
    }
})