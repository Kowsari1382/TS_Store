import type { NextFunction, Request, Response } from "express";
import { TryCatchController } from "../utilities/TryCatchController.js";
import { z } from "zod";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import type { IUserService } from "./interfaces/services/iuser-service.js";
import type { IUserController } from "./interfaces/controllers/iuser-controlle.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class UserController implements IUserController {

    constructor(private readonly IuserService: IUserService) { }

    public findAll = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.IuserService.findAll()
        res.send(users)
    })

    public findByID = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.id) return res.status(403).send("Access is denied.")
        const users = await this.IuserService.findByID(parsed.data.id)
        res.send(users)
    })

    public findByUsername = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            username: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.Username != parsed.data.username) return res.status(403).send("Access is denied.")
        const users = await this.IuserService.findByUsername(parsed.data.username)
        res.send(users)
    })

    public findAvatar = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.Username != parsed.data.id) return res.status(403).send("Access is denied.")
        const result = await this.IuserService.findAvatar(parsed.data.id)
        if (result.Status === 200) return res.status(result.Status).sendFile(path.join(__dirname, "../../", result.Path!))
        res.status(result.Status).send(result.Message)
    })

    public Register = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            Username: z.string().min(5).max(50),
            Password: z.string().min(8).max(50),
            Number: z.string().optional(),
            Email: z.string().email().optional(),
            Bio: z.string().optional(),
            Address: z.string().optional()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IuserService.Register(parsed.data)
        if (result.Status !== 200) return res.status(result.Status).header("Authorization", result.Authorization).send(result.Message)
        if (!req.file) return res.status(result.Status).header("Authorization", result.Authorization).send(result.Message + " Avatar did not upload.")
        const fileExtension = path.extname(req.file.originalname)
        fs.writeFile("Avatars/" + result.ID + fileExtension, req.file.buffer, (err) => {
            console.log(err)
        })
        const imgResult = await this.IuserService.UpdateAvatar(result.ID, result.ID + fileExtension)
        res.status(result.Status).header("Authorization", result.Authorization).send(result.Message + " " + imgResult.Message)
    })

    public Login = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            Username: z.string().min(5).max(50),
            Password: z.string().min(8).max(50)
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IuserService.Login(parsed.data)
        res.status(result.Status).header("Authorization", result.Authorization).send(result.Message)
    })

    public Add = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            Username: z.string().min(5).max(50),
            Password: z.string().min(8).max(50),
            Number: z.string().optional(),
            Email: z.string().email().optional(),
            Bio: z.string().optional(),
            Address: z.string().optional(),
            Role: z.string()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IuserService.Add(parsed.data)
        if (result.Status !== 200) return res.status(result.Status).header("Authorization", result.Authorization).send(result.Message)
        if (!req.file) return res.status(result.Status).header("Authorization", result.Authorization).send(result.Message + " Avatar did not upload.")
        const fileExtension = path.extname(req.file.originalname)
        fs.writeFile("Avatars/" + result.ID + fileExtension, req.file.buffer, (err) => {
            console.log(err)
        })
        const imgResult = await this.IuserService.UpdateAvatar(result.ID, result.ID + fileExtension)
        res.status(result.Status).header("Authorization", result.Authorization).send(result.Message + " " + imgResult.Message)
    })

    public Update = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            ID: z.any(),
            Username: z.string().min(5).max(50),
            Password: z.string().min(8).max(50),
            Number: z.string().optional(),
            Email: z.string().email().optional(),
            Bio: z.string().optional(),
            Address: z.string().optional(),
            Role: z.string()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IuserService.Update(parsed.data)
        if (result.Status !== 200) return res.status(result.Status).send(result.Message)
        if (!req.file) return res.status(result.Status).send(result.Message + " Avatar did not upload.")
        const fileExtension = path.extname(req.file.originalname)
        fs.writeFile("Avatars/" + parsed.data.ID + fileExtension, req.file.buffer, (err) => {
            console.log(err)
        })
        const imgResult = await this.IuserService.UpdateAvatar(parsed.data.ID, parsed.data.ID + fileExtension)
        res.status(result.Status).send(result.Message + " " + imgResult.Message)
    })

    public Edit = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            ID: z.any(),
            Username: z.string().min(5).max(50),
            Password: z.string().min(8).max(50),
            Number: z.string().optional(),
            Email: z.string().email().optional(),
            Bio: z.string().optional(),
            Address: z.string().optional()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.ID) return res.status(403).send("Access is denied.")
        const result = await this.IuserService.Edit(parsed.data)
        if (result.Status !== 200) return res.status(result.Status).send(result.Message)
        if (!req.file) return res.status(result.Status).send(result.Message + " Avatar did not upload.")
        const fileExtension = path.extname(req.file.originalname)
        fs.writeFile("Avatars/" + parsed.data.ID + fileExtension, req.file.buffer, (err) => {
            console.log(err)
        })
        const imgResult = await this.IuserService.UpdateAvatar(parsed.data.ID, parsed.data.ID + fileExtension)
        res.status(result.Status).send(result.Message + " " + imgResult.Message)
    })

    public Delete = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.id) return res.status(403).send("Access is denied.")
        const result = await this.IuserService.Delete(parsed.data.id)
        res.status(result.Status).send(result.Message)
    })

    public DeleteAvatar = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.id) return res.status(403).send("Access is denied.")
        const result = await this.IuserService.DeleteAvatar(parsed.data.id)
        fs.unlink(result.Path, (err) => {
            console.log(err)
        })
        res.status(result.Status).send(result.Message)
    })

}