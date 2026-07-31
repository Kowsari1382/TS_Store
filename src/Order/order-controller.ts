import type { NextFunction, Request, Response } from "express";
import { TryCatchController } from "../utilities/TryCatchController.js";
import z from "zod";
import type { IOrderController } from "./interfaces/controllers/iorder-controller.js";
import type { IOrderService } from "./interfaces/services/iorder-service.js";

export class OrderController implements IOrderController{
    constructor(private readonly IorderService: IOrderService){}
    
    public findAll = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const orders = await this.IorderService.findAll()
        res.send(orders)
    })
    
    public findByUserID = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.id) return res.status(403).send("Access is denied.")
        const orders = await this.IorderService.findByUserID(parsed.data.id)
        res.send(orders)
    })

    public findByProductID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const orders = await this.IorderService.findByProductID(parsed.data.id)
        res.send(orders)
    })

    public Add = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            UserID: z.number()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
        const result = await this.IorderService.Add(parsed.data.UserID)
        res.status(result.Status).send(result.Message)
    })

    // public Add = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
    //     const schema = {
    //         UserID: z.number()
    //     }
    //     const parsed = z.object(schema).safeParse(req.body)
    //     if(!parsed.success) return res.status(400).send(parsed.error.issues)
    //     if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
    //     const result = await this.IorderService.Add(parsed.data.UserID)
    //     if(result.Status !== 200) return res.status(result.Status).send(result.Message)
    //     res.redirect(result.Zarinpal!.payments.getRedirectUrl(result.Response.data.authority))
    // })

    // public Verify = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
    //     const schema = {
    //         authority: z.string()
    //     }
    //     const parsed = z.object(schema).safeParse(req.query)
    //     if(!parsed.success) return res.status(400).send(parsed.error.issues)
    //     const result = await this.IorderService.Verify(parsed.data.authority)
    //     res.status(result.Status).send(result.Message)
    // })

    public Update = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            ID: z.number(),
            UserID: z.number(),
            ProductID: z.number(),
            Number: z.number(),
            TotalPrice: z.number(),
            State: z.string()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IorderService.Update(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public Delete = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IorderService.Delete(parsed.data.id)
        res.status(result.Status).send(result.Message)
    })

}