import type { CartRepository } from "../repositories/cart-repository.js"
import type { ProductRepository } from "../repositories/product-repository.js"
import type { UserRepository } from "../repositories/user-repository.js"

export class CartService {
    constructor(private readonly cartRepository: CartRepository,
        private readonly productRepository: ProductRepository,
        private readonly userRepository: UserRepository
    ) { }

    public async findAll() {
        return await this.cartRepository.findAll()
    }

    public async findByUserID(userid: number) {
        return await this.cartRepository.findByUserID(userid)
    }

    public async findByProductID(productid: number) {
        return await this.cartRepository.findByProductID(productid)
    }

    public async findByUserProductID(userid: number, productid: number) {
        return await this.cartRepository.findByUserProductID(userid, productid)
    }

    public async findTotalPrice(userid: number) {
        return await this.cartRepository.findTotalPrice(userid)
    }

    public async Add(cartInfo: any) {
        const user = await this.userRepository.findByID(cartInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const product = await this.productRepository.findByID(cartInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        if (parseInt(product[0].Stock) < parseInt(cartInfo.Number)) return { Status: 400, Message: "There is not enough product." }
        const userCart = await this.cartRepository.findByUserProductID(cartInfo.UserID, cartInfo.ProductID)
        if (userCart && userCart.length > 0) {
            if (parseInt(product[0].Stock) < (parseInt(userCart[0].Number) + parseInt(cartInfo.Number))) {
                await this.cartRepository.Update(cartInfo.UserID, cartInfo.ProductID, parseInt(product[0].Stock))
                return { Status: 200, Message: "Adding was successful." }
            }
            await this.cartRepository.Plus(cartInfo.UserID, cartInfo.ProductID, cartInfo.Number)
            return { Status: 200, Message: "Adding was successful." }
        }
        await this.cartRepository.Add(cartInfo.UserID, cartInfo.ProductID, cartInfo.Number)
        return { Status: 200, Message: "Adding was successful." }
    }

    public async Update(cartInfo: any) {
        const user = await this.userRepository.findByID(cartInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const product = await this.productRepository.findByID(cartInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const userCart = await this.cartRepository.findByUserProductID(cartInfo.UserID, cartInfo.ProductID)
        if (!userCart || userCart.length === 0) return {Status: 400, Message: "There is not this cart for user."}
        if (parseInt(product[0].Stock) < parseInt(cartInfo.Number)) {
            await this.cartRepository.Update(cartInfo.UserID, cartInfo.ProductID, parseInt(product[0].Stock))
            return { Status: 200, Message: "Updating was successful." }
        }
        await this.cartRepository.Update(cartInfo.UserID, cartInfo.ProductID, cartInfo.Number)
        return { Status: 200, Message: "Updating was successful." }
    }

    public async Minus(cartInfo: any) {
        const user = await this.userRepository.findByID(cartInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const product = await this.productRepository.findByID(cartInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const userCart = await this.cartRepository.findByUserProductID(cartInfo.UserID, cartInfo.ProductID)
        if (!userCart || userCart.length === 0) return { Status: 400, Message: "This cart does not exist." }
        if (parseInt(userCart[0].Number) < parseInt(cartInfo.Number)) {
            await this.cartRepository.Delete(cartInfo.UserID, cartInfo.ProductID)
            return { Status: 200, Message: "Delete was successful." }
        }
        await this.cartRepository.Minus(cartInfo.UserID, cartInfo.ProductID, cartInfo.Number)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async Delete(cartInfo: any) {
        const user = await this.userRepository.findByID(cartInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const product = await this.productRepository.findByID(cartInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        await this.cartRepository.Delete(cartInfo.UserID, cartInfo.ProductID)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async DeleteByUserID(userid: number) {
        const user = await this.userRepository.findByID(userid)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.cartRepository.DeleteByUserID(userid)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async DeleteByProductID(productid: number) {
        const product = await this.productRepository.findByID(productid)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        await this.cartRepository.DeleteByProductID(productid)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async Reset(userid: any){
        return await this.cartRepository.Reset(userid)
    }

    public async Clean(){
        return await this.cartRepository.Clean()
    }

}