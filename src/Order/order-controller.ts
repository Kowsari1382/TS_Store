import type { NextFunction, Request, Response } from "express";
import { OrderService } from "./order-service.js";
import { TryCatchController } from "../utilities/TryCatchController.js";
import z from "zod";
import type { IOrderController } from "./interfaces/controllers/iorder-controller.js";

export class OrderController implements IOrderController{
    constructor(private readonly orderService: OrderService){}
    
    public findAll = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const orders = await this.orderService.findAll()
        res.send(orders)
    })
    
    public findByUserID = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.id) return res.status(403).send("Access is denied.")
        const orders = await this.orderService.findByUserID(parsed.data.id)
        res.send(orders)
    })

    public findByProductID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const orders = await this.orderService.findByProductID(parsed.data.id)
        res.send(orders)
    })

    public Add = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            UserID: z.number()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
        const result = await this.orderService.Add(parsed.data.UserID)
        res.status(result.Status).send(result.Message)
    })

    // public Add = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
    //     const schema = {
    //         UserID: z.number()
    //     }
    //     const parsed = z.object(schema).safeParse(req.body)
    //     if(!parsed.success) return res.status(400).send(parsed.error.issues)
    //     if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
    //     const result = await this.orderService.Add(parsed.data.UserID)
    //     if(result.Status !== 200) return res.status(result.Status).send(result.Message)
    //     res.redirect(result.Zarinpal!.payments.getRedirectUrl(result.Response.data.authority))
    // })

    // public Verify = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
    //     const schema = {
    //         authority: z.string()
    //     }
    //     const parsed = z.object(schema).safeParse(req.query)
    //     if(!parsed.success) return res.status(400).send(parsed.error.issues)
    //     const result = await this.orderService.Verify(parsed.data.authority)
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
        const result = await this.orderService.Update(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public Delete = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if(!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.orderService.Delete(parsed.data.id)
        res.status(result.Status).send(result.Message)
    })

}