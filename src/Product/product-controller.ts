import type { NextFunction, Request, Response } from "express";
import { TryCatchController } from "../utilities/TryCatchController.js";
import z from "zod";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import type { IProductController } from "./interfaces/controllers/iproduct-controller.js";
import type { IProductService } from "./interfaces/services/iproduct-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ProductController implements IProductController {
    constructor(private readonly IproductService: IProductService) { }

    public findAll = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const products = await this.IproductService.findAll()
        res.send(products)
    })

    public findByID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const product = await this.IproductService.findByID(parsed.data.id)
        res.send(product)
    })

    public findSomeImgByProductID = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const imgs = await this.IproductService.findSomeImgByProductID(parsed.data.id)
        res.send(imgs)
    })

    public findImgByProductIDPageNumber = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any(),
            pagenumber: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IproductService.findImgByProductIDPageNumber(parsed.data.id, parsed.data.pagenumber)
        if (result.Status === 200) return res.status(result.Status).sendFile(path.join(__dirname, "../../", result.Path))
        res.status(result.Status).send(result.Message)
    })

    public findByProductIDAttributes = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const attrs = await this.IproductService.findByProductIDAttributes(parsed.data.id)
        res.send(attrs)
    })

    public findByProductname = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            productname: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const product = await this.IproductService.findByProductname(parsed.data.productname)
        res.send(product)
    })

    public findByCategory = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            category: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const product = await this.IproductService.findByCategory(parsed.data.category)
        res.send(product)
    })

    public Add = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            Productname: z.string(),
            Description: z.string().max(500),
            Price: z.number(),
            Stock: z.number(),
            Category: z.string(),
            Attributes: z.string().array().optional(),
            Values: z.string().array().optional()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IproductService.Add(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public Update = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            ID: z.number(),
            Productname: z.string(),
            Description: z.string().max(500),
            Price: z.number(),
            Stock: z.number(),
            Category: z.string(),
            Attributes: z.string().array().optional(),
            Values: z.string().array().optional()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IproductService.Update(parsed.data)
        res.status(result.Status).send(result.Message)
    })

    public setScore = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            ID: z.number(),
            Score: z.number()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IproductService.setScore(parsed.data.ID, parsed.data.Score)
        res.status(result.Status).send(result.Message)
    })

    public Delete = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            id: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IproductService.Delete(parsed.data.id)
        res.status(result.Status).send(result.Message)
    })

    public AddImg = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            ProductID: z.any(),
            PageNumber: z.any()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (!req.file) return res.status(400).send("Image does not exist.")
        const result = await this.IproductService.AddImg(parsed.data.ProductID, parsed.data.PageNumber, parsed.data.ProductID + parsed.data.PageNumber + path.extname(req.file.originalname))
        if (result.Status !== 200) return res.status(result.Status).send(result.Message)
        fs.writeFile(result.Path!, req.file.buffer, (err) => {
            console.log(err)
        })
        res.status(result.Status).send(result.Message)
    })

    public UpdateImg = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            ProductID: z.number(),
            PageNumber: z.number()
        }
        const parsed = z.object(schema).safeParse(req.body)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        if (!req.file) return res.status(400).send("Image does not exist.")
        const result = await this.IproductService.UpdateImg(parsed.data.ProductID, parsed.data.PageNumber, parsed.data.ProductID + parsed.data.PageNumber + path.extname(req.file.originalname))
        if (result.Status !== 200) return res.status(result.Status).send(result.Message)
        fs.writeFile(result.Path!, req.file.buffer, (err) => {
            console.log(err)
        })
        res.status(result.Status).send(result.Message)
    })

    public DeleteImg = TryCatchController(async (req: Request, res: Response, next: NextFunction) => {
        const schema = {
            productid: z.any(),
            pagenumber: z.any()
        }
        const parsed = z.object(schema).safeParse(req.params)
        if (!parsed.success) return res.status(400).send(parsed.error.issues)
        const result = await this.IproductService.DeleteImg(parsed.data.productid, parsed.data.pagenumber)
        res.status(result.Status).send(result.Message)
    })

}