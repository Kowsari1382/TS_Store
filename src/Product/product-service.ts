import fs from "fs";
import type { ProductRepository } from "./product-repository.js";
import type { CartRepository } from "../Cart/cart-repository.js";
import type { IProductService } from "./interfaces/services/iproduct-service.js";

export class ProductService implements IProductService {
    constructor(private readonly productRepository: ProductRepository,
        private readonly cartRepository: CartRepository
    ) { }

    public async findAll() {
        return await this.productRepository.findAll()
    }

    public async findByID(id: number) {
        return await this.productRepository.findByID(id)
    }

    public async findByProductname(productname: string) {
        return await this.productRepository.findByProductname(productname)
    }

    public async findByCategory(category: string) {
        return await this.productRepository.findByCategory(category)
    }

    public async findAllAttributes() {
        return await this.productRepository.findAllAttributes()
    }

    public async findByProductIDAttributes(productid: number) {
        return await this.productRepository.findByProductIDAttributes(productid)
    }

    public async Add(productInfo: any) {
        const product = await this.productRepository.findByProductname(productInfo.Productname)
        if (product && product.length > 0) return { Status: 400, Message: "Product already exists." }
        await this.productRepository.Add(productInfo.Productname, productInfo.Description, productInfo.Price, productInfo.Stock, productInfo.Category)
        if ((!productInfo.Attributes || productInfo.Attributes.length === 0) || (!productInfo.Values || productInfo.Values.length === 0)) return { Status: 200, Message: "Adding was successful." }
        if (productInfo.Attributes.length !== productInfo.Values.length) return { Status: 200, Message: "Adding was successful." }
        const newProduct = await this.productRepository.findByProductname(productInfo.Productname)
        for (let i = 0; i < productInfo.Attributes.length; i++) {
            await this.productRepository.AddAttributes(newProduct![0].ID, productInfo.Attributes[i], productInfo.Values[i])
        }
        return { Status: 200, Message: "Adding was successful." }
    }

    public async Update(productInfo: any) {
        const product = await this.productRepository.findByID(productInfo.ID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        await this.productRepository.Update(productInfo.ID, productInfo.Productname, productInfo.Description, productInfo.Price, productInfo.Stock, productInfo.Category)
        if ((!productInfo.Attributes || productInfo.Attributes.length === 0) || (!productInfo.Values || productInfo.Values.length === 0)) return { Status: 200, Message: "Update was successful." }
        if (productInfo.Attributes.length !== productInfo.Values.length) return { Status: 200, Message: "Update was successful." }
        await this.productRepository.DeleteAttributes(productInfo.ID)
        for (let i = 0; i < productInfo.Attributes.length; i++) {
            await this.productRepository.AddAttributes(productInfo.ID, productInfo.Attributes[i], productInfo.Values[i])
        }
        return { Status: 200, Message: "Update was successful." }
    }

    public async setScore(id: number, score: number) {
        await this.productRepository.setScore(id, score)
        return { Status: 200, Message: "Setting score was successful." }
    }

    public async Delete(id: number) {
        const product = await this.productRepository.findByID(id)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        await this.productRepository.Delete(id)
        await this.cartRepository.DeleteByProductID(id)
        await this.productRepository.DeleteImgs(id)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async Reset(userid: number) {
        return await this.productRepository.Reset(userid)
    }

    public async findImgByProductIDPageNumber(productid: number, pagenumber: number) {
        const img = await this.productRepository.findImgByProductIDPageNumber(productid, pagenumber)
        if (!img || img.length === 0) return { Status: 400, Message: "Image does not exist." }
        if (!img[0].Path) return { Status: 400, Message: "Image does not exist." }
        return { Status: 200, Message: "Image found", Path: img[0].Path }
    }

    public async findSomeImgByProductID(productid: number) {
        return await this.productRepository.findSomeImgByProductID(productid)
    }

    public async AddImg(productid: number, page: number, path: string) {
        const product = await this.productRepository.findByID(productid)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const pagenumber = await this.productRepository.findImgByProductIDPageNumber(productid, page)
        if (pagenumber && pagenumber.length > 0) return { Status: 400, Message: "Page number alreay exists." }
        await this.productRepository.AddImg(productid, page, "ProductImg/" + path)
        return { Status: 200, Message: "OK!", ProductID: productid, PageNumber: page, Path: "ProductImg/" + path }
    }

    public async UpdateImg(productid: number, page: number, path: string) {
        const product = await this.productRepository.findByID(productid)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const pagenumber = await this.productRepository.findImgByProductIDPageNumber(productid, page)
        if (!pagenumber || pagenumber.length === 0) return { Status: 400, Message: "Page number does not exist." }
        fs.unlink(`${pagenumber[0].Path}`, (err) => {
            console.log(err)
        })
        await this.productRepository.UpdateImg(productid, page, "ProductImg/" + path)
        return { Status: 200, Message: "OK!", ProductID: productid, PageNumber: page, Path: "ProductImg/" + path }
    }

    public async DeleteImg(productid: number, page: number) {
        const product = await this.productRepository.findByID(productid)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const pagenumber = await this.productRepository.findImgByProductIDPageNumber(productid, page)
        if (!pagenumber || pagenumber.length === 0) return { Status: 400, Message: "Page number does not exist." }
        fs.unlink(`${pagenumber[0].Path}`, (err) => {
            console.log(err)
        })
        await this.productRepository.DeleteImg(productid, page)
        return { Status: 200, Message: "OK!" }
    }

}