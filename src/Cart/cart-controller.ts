import type { NextFunction, Request, Response } from "express";
import { CartService } from "./cart-service.js";
import { TryCatchController } from "../utilities/TryCatchController.js";
import z from "zod";

export class CartController {
    constructor(private readonly cartService: CartService) { }

    public findAll = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const carts = await this.cartService.findAll()
        res.send(carts)
    })

    public findByUserID = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.id) return res.status(403).send("Access is denied.")
        const carts = await this.cartService.findByUserID(parsed.data.id)
        res.send(carts)
    })

    public findByProductID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const carts = await this.cartService.findByProductID(parsed.data.id)
        res.send(carts)
    })

    public findByUserProductID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            userid: z.any(),
            productid: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const carts = await this.cartService.findByUserProductID(parsed.data.userid, parsed.data.productid)
        res.send(carts)
    })

    public Add = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            UserID: z.number(),
            ProductID: z.number(),
            Number: z.number()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
        const result = await this.cartService.Add(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public Minus = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            UserID: z.number(),
            ProductID: z.number(),
            Number: z.number()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
        const result = await this.cartService.Minus(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public Delete = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            UserID: z.number(),
            ProductID: z.number()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.UserID) return res.status(403).send("Access is denied.")
        const result = await this.cartService.Delete(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public DeleteByUserID = TryCatchController(async (req: any, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (req.UserData.Role !== "Admin" && req.UserData.ID != parsed.data.id) return res.status(403).send("Access is denied.")
        const result = await this.cartService.DeleteByUserID(parsed.data.id)
        res.status(result.Status).send(result.Message)
    })

    public DeleteByProductID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.cartService.DeleteByProductID(parsed.data.id)
        res.status(result.Status).send(result.Message)
    })

}