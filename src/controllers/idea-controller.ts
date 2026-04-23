import type { NextFunction, Request, Response } from "express";
import { IdeaService } from "../services/idea-service.js";
import { TryCatchController } from "../utilities/TryCatchController.js";
import z from "zod";

export class IdeaController{
    
    constructor(private readonly ideaService: IdeaService){}

    public findAll = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const ideas = await this.ideaService.findAll()
        res.send(ideas)
    })

    public findByID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const ideas = await this.ideaService.findByID(parsed.data.id)
        res.send(ideas)
    })

    public findByUserID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const ideas = await this.ideaService.findByUserID(parsed.data.id)
        res.send(ideas)
    })

    public findByProductID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const ideas = await this.ideaService.findByProductID(parsed.data.id)
        res.send(ideas)
    })

    public findByUserProductID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            userid: z.any(),
            productid: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const idea = await this.ideaService.findByUserProductID(parsed.data.userid, parsed.data.productid)
        res.send(idea)
    })

    public Add = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            UserID: z.number(),
            ProductID: z.number(),
            Score: z.number().min(0).max(5),
            Comment: z.string().optional()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
        const result = await this.ideaService.Add(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public Update = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            ID: z.number(),
            UserID: z.number(),
            ProductID: z.number(),
            Score: z.number().min(0).max(5),
            Comment: z.string().optional()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
        const result = await this.ideaService.Update(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public Delete = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            ID: z.number(),
            UserID: z.number(),
            ProductID: z.number()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
        const result = await this.ideaService.Delete(parsed.data)
        res.status(result.Status).send(result.Message)
    })

}