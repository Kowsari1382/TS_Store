import fs from "fs";
import type { IProductService } from "./interfaces/services/iproduct-service.js";
import type { IProductRepository } from "./interfaces/repositories/iproduct-repository.js";
import type { ICartRepository } from "../Cart/interfaces/repositories/icart-repository.js";

export class ProductService implements IProductService {
    constructor(private readonly IproductRepository: IProductRepository,
        private readonly IcartRepository: ICartRepository
    ) { }

    public async findAll() {
        return await this.IproductRepository.findAll()
    }

    public async findByID(id: number) {
        return await this.IproductRepository.findByID(id)
    }

    public async findByProductname(productname: string) {
        return await this.IproductRepository.findByProductname(productname)
    }

    public async findByCategory(category: string) {
        return await this.IproductRepository.findByCategory(category)
    }

    public async findAllAttributes() {
        return await this.IproductRepository.findAllAttributes()
    }

    public async findByProductIDAttributes(productid: number) {
        return await this.IproductRepository.findByProductIDAttributes(productid)
    }

    public async Add(productInfo: any) {
        const product = await this.IproductRepository.findByProductname(productInfo.Productname)
        if (product && product.length > 0) return { Status: 400, Message: "Product already exists." }
        await this.IproductRepository.Add(productInfo.Productname, productInfo.Description, productInfo.Price, productInfo.Stock, productInfo.Category)
        if ((!productInfo.Attributes || productInfo.Attributes.length === 0) || (!productInfo.Values || productInfo.Values.length === 0)) return { Status: 200, Message: "Adding was successful." }
        if (productInfo.Attributes.length !== productInfo.Values.length) return { Status: 200, Message: "Adding was successful." }
        const newProduct = await this.IproductRepository.findByProductname(productInfo.Productname)
        for (let i = 0; i < productInfo.Attributes.length; i++) {
            await this.IproductRepository.AddAttributes(newProduct![0].ID, productInfo.Attributes[i], productInfo.Values[i])
        }
        return { Status: 200, Message: "Adding was successful." }
    }

    public async Update(productInfo: any) {
        const product = await this.IproductRepository.findByID(productInfo.ID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        await this.IproductRepository.Update(productInfo.ID, productInfo.Productname, productInfo.Description, productInfo.Price, productInfo.Stock, productInfo.Category)
        if ((!productInfo.Attributes || productInfo.Attributes.length === 0) || (!productInfo.Values || productInfo.Values.length === 0)) return { Status: 200, Message: "Update was successful." }
        if (productInfo.Attributes.length !== productInfo.Values.length) return { Status: 200, Message: "Update was successful." }
        await this.IproductRepository.DeleteAttributes(productInfo.ID)
        for (let i = 0; i < productInfo.Attributes.length; i++) {
            await this.IproductRepository.AddAttributes(productInfo.ID, productInfo.Attributes[i], productInfo.Values[i])
        }
        return { Status: 200, Message: "Update was successful." }
    }

    public async setScore(id: number, score: number) {
        await this.IproductRepository.setScore(id, score)
        return { Status: 200, Message: "Setting score was successful." }
    }

    public async Delete(id: number) {
        const product = await this.IproductRepository.findByID(id)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        await this.IproductRepository.Delete(id)
        await this.IcartRepository.DeleteByProductID(id)
        await this.IproductRepository.DeleteImgs(id)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async Reset(userid: number) {
        return await this.IproductRepository.Reset(userid)
    }

    public async findImgByProductIDPageNumber(productid: number, pagenumber: number) {
        const img = await this.IproductRepository.findImgByProductIDPageNumber(productid, pagenumber)
        if (!img || img.length === 0) return { Status: 400, Message: "Image does not exist." }
        if (!img[0].Path) return { Status: 400, Message: "Image does not exist." }
        return { Status: 200, Message: "Image found", Path: img[0].Path }
    }

    public async findSomeImgByProductID(productid: number) {
        return await this.IproductRepository.findSomeImgByProductID(productid)
    }

    public async AddImg(productid: number, page: number, path: string) {
        const product = await this.IproductRepository.findByID(productid)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const pagenumber = await this.IproductRepository.findImgByProductIDPageNumber(productid, page)
        if (pagenumber && pagenumber.length > 0) return { Status: 400, Message: "Page number alreay exists." }
        await this.IproductRepository.AddImg(productid, page, "ProductImg/" + path)
        return { Status: 200, Message: "OK!", ProductID: productid, PageNumber: page, Path: "ProductImg/" + path }
    }

    public async UpdateImg(productid: number, page: number, path: string) {
        const product = await this.IproductRepository.findByID(productid)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const pagenumber = await this.IproductRepository.findImgByProductIDPageNumber(productid, page)
        if (!pagenumber || pagenumber.length === 0) return { Status: 400, Message: "Page number does not exist." }
        fs.unlink(`${pagenumber[0].Path}`, (err) => {
            console.log(err)
        })
        await this.IproductRepository.UpdateImg(productid, page, "ProductImg/" + path)
        return { Status: 200, Message: "OK!", ProductID: productid, PageNumber: page, Path: "ProductImg/" + path }
    }

    public async DeleteImg(productid: number, page: number) {
        const product = await this.IproductRepository.findByID(productid)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const pagenumber = await this.IproductRepository.findImgByProductIDPageNumber(productid, page)
        if (!pagenumber || pagenumber.length === 0) return { Status: 400, Message: "Page number does not exist." }
        fs.unlink(`${pagenumber[0].Path}`, (err) => {
            console.log(err)
        })
        await this.IproductRepository.DeleteImg(productid, page)
        return { Status: 200, Message: "OK!" }
    }

}