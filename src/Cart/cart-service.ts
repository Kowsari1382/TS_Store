import type { IProductRepository } from "../Product/interfaces/repositories/iproduct-repository.js"
import type { IUserRepository } from "../User/interfaces/repositories/iuser-repository.js"
import type { ICartRepository } from "./interfaces/repositories/icart-repository.js"
import type { ICartService } from "./interfaces/services/icart-service.js"

export class CartService implements ICartService{
    constructor(private readonly IcartRepository: ICartRepository,
        private readonly IproductRepository: IProductRepository,
        private readonly IuserRepository: IUserRepository
    ) { }

    public async findAll() {
        return await this.IcartRepository.findAll()
    }

    public async findByUserID(userid: number) {
        return await this.IcartRepository.findByUserID(userid)
    }

    public async findByProductID(productid: number) {
        return await this.IcartRepository.findByProductID(productid)
    }

    public async findByUserProductID(userid: number, productid: number) {
        return await this.IcartRepository.findByUserProductID(userid, productid)
    }

    public async findTotalPrice(userid: number) {
        return await this.IcartRepository.findTotalPrice(userid)
    }

    public async Add(cartInfo: any) {
        const user = await this.IuserRepository.findByID(cartInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const product = await this.IproductRepository.findByID(cartInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        if (parseInt(product[0].Stock) < parseInt(cartInfo.Number)) return { Status: 400, Message: "There is not enough product." }
        const userCart = await this.IcartRepository.findByUserProductID(cartInfo.UserID, cartInfo.ProductID)
        if (userCart && userCart.length > 0) {
            if (parseInt(product[0].Stock) < (parseInt(userCart[0].Number) + parseInt(cartInfo.Number))) {
                await this.IcartRepository.Update(cartInfo.UserID, cartInfo.ProductID, parseInt(product[0].Stock))
                return { Status: 200, Message: "Adding was successful." }
            }
            await this.IcartRepository.Plus(cartInfo.UserID, cartInfo.ProductID, cartInfo.Number)
            return { Status: 200, Message: "Adding was successful." }
        }
        await this.IcartRepository.Add(cartInfo.UserID, cartInfo.ProductID, cartInfo.Number)
        return { Status: 200, Message: "Adding was successful." }
    }

    public async Update(cartInfo: any) {
        const user = await this.IuserRepository.findByID(cartInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const product = await this.IproductRepository.findByID(cartInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const userCart = await this.IcartRepository.findByUserProductID(cartInfo.UserID, cartInfo.ProductID)
        if (!userCart || userCart.length === 0) return {Status: 400, Message: "There is not this cart for user."}
        if (parseInt(product[0].Stock) < parseInt(cartInfo.Number)) {
            await this.IcartRepository.Update(cartInfo.UserID, cartInfo.ProductID, parseInt(product[0].Stock))
            return { Status: 200, Message: "Updating was successful." }
        }
        await this.IcartRepository.Update(cartInfo.UserID, cartInfo.ProductID, cartInfo.Number)
        return { Status: 200, Message: "Updating was successful." }
    }

    public async Minus(cartInfo: any) {
        const user = await this.IuserRepository.findByID(cartInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const product = await this.IproductRepository.findByID(cartInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const userCart = await this.IcartRepository.findByUserProductID(cartInfo.UserID, cartInfo.ProductID)
        if (!userCart || userCart.length === 0) return { Status: 400, Message: "This cart does not exist." }
        if (parseInt(userCart[0].Number) < parseInt(cartInfo.Number)) {
            await this.IcartRepository.Delete(cartInfo.UserID, cartInfo.ProductID)
            return { Status: 200, Message: "Delete was successful." }
        }
        await this.IcartRepository.Minus(cartInfo.UserID, cartInfo.ProductID, cartInfo.Number)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async Delete(cartInfo: any) {
        const user = await this.IuserRepository.findByID(cartInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const product = await this.IproductRepository.findByID(cartInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        await this.IcartRepository.Delete(cartInfo.UserID, cartInfo.ProductID)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async DeleteByUserID(userid: number) {
        const user = await this.IuserRepository.findByID(userid)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.IcartRepository.DeleteByUserID(userid)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async DeleteByProductID(productid: number) {
        const product = await this.IproductRepository.findByID(productid)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        await this.IcartRepository.DeleteByProductID(productid)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async Reset(userid: any){
        return await this.IcartRepository.Reset(userid)
    }

    public async Clean(){
        return await this.IcartRepository.Clean()
    }

}