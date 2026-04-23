import type { NextFunction, Response } from "express"
import { TryCatchController } from "../utilities/TryCatchController.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const CheckAuth = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).send('Access is denied.');
    try {
        const decode = jwt.verify(token, process.env.SecretKey!);
        req.UserData = decode;
        next();
    } catch (error) {
        res.status(403).send('Token is invalid');
    }
})