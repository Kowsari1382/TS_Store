import ZarinPal from "zarinpal-node-sdk";
import type { IOrderService } from "./interfaces/services/iorder-service.js";
import type { IOrderRepository } from "./interfaces/repositories/iorder-repository.js";
import type { ICartRepository } from "../Cart/interfaces/repositories/icart-repository.js";
import type { IProductRepository } from "../Product/interfaces/repositories/iproduct-repository.js";

const zarinPal = new ZarinPal.default({
    merchantId: "",
    accessToken: "",
    sandbox: true
})

export class OrderService implements IOrderService {
    constructor(private readonly IorderRepository: IOrderRepository,
        private readonly IcartRepository: ICartRepository,
        private readonly IproductRepository: IProductRepository
    ) { }

    public async findAll() {
        return await this.IorderRepository.findAll()
    }

    public async findByUserID(userid: number) {
        return await this.IorderRepository.findByUserID(userid)
    }

    public async findByProductID(productid: number) {
        return await this.IorderRepository.findByProductID(productid)
    }

    public async Add(userid: number) {
        const userCart = await this.IcartRepository.findByUserID(userid)
        if (!userCart || userCart.length === 0) return { Status: 400, Message: "There is not cart for this user." }
        const totalPrice = await this.IcartRepository.findTotalPrice(userid)
        //Payment is here
        await this.IorderRepository.AddForUser(userid)
        await this.IcartRepository.Reset(userid)
        await this.IcartRepository.Clean()
        await this.IproductRepository.Reset(userid)
        await this.IcartRepository.DeleteByUserID(userid)
        return { Status: 200, Message: "Adding was successful." }
    }

    // public async Add(userid: number) {
    //     const IcartRepository = new IcartRepository()
    //     const cartService = new CartService(IcartRepository)
    //     const userCart = await cartService.findByUserID(userid)
    //     if (!userCart || userCart.length === 0) return { Status: 400, Message: "There is not cart for this user." }
    //     const totalPrice = await cartService.findTotalPrice(userid)
    //     const response = await zarinPal.payments.create({
    //         amount: totalPrice![0].TotalPrice,
    //         description: "پرداخت خرید محصولات",
    //         callback_url: `http://localhost:3000/api/order/verify`
    //     })
    //     await this.IorderRepository.AddPayment(response.data.authority, userid, totalPrice![0].TotalPrice)
    //     return { Status: 200, Message: "OK", Zarinpal: zarinPal, Response: response }
    // }

    // public async Verify(authority: string) {
    //     const IcartRepository = new IcartRepository()
    //     const cartService = new CartService(IcartRepository)
    //     const IproductRepository = new IproductRepository()
    //     const productService = new ProductService(IproductRepository)
    //     const payment = await this.IorderRepository.findPayment(authority)
    //     if (!payment || payment.length === 0) return { Status: 400, Message: "There is not payment for this user" }
    //     const response = await zarinPal.verifications.verify({
    //         amount: payment[0].TotalPrice,
    //         authority: authority
    //     })
    //     if (response.data.code !== 100 && response.data.code !== 101) {
    //         await this.IorderRepository.DeletePayment(authority)
    //         return { Status: 400, Message: "Verifying failed." }
    //     }
    //     await this.IorderRepository.AddForUser(payment[0].UserID)
    //     await cartService.Reset(payment[0].UserID)
    //     await cartService.Clean()
    //     await productService.Reset(payment[0].UserID)
    //     await cartService.DeleteByUserID(payment[0].UserID)
    //     return { Status: 200, Message: "Adding was successful." }
    // }

    public async Update(orderInfo: any) {
        const userOrder = await this.IorderRepository.findByUserID(orderInfo.UserID)
        if (!userOrder || userOrder.length === 0) return { Status: 400, Message: "There is not order for this user." }
        await this.IorderRepository.Update(orderInfo.ID, orderInfo.UserID, orderInfo.ProductID, orderInfo.Number, orderInfo.TotalPrice, orderInfo.State)
        return { Status: 200, Message: "Updating was successful." }
    }

    public async Delete(id: number) {
        const userOrder = await this.IorderRepository.findByUserID(id)
        if (!userOrder || userOrder.length === 0) return { Status: 400, Message: "There is not order for this user." }
        await this.IorderRepository.Delete(id)
        return { Status: 200, Message: "Deleting was successful." }
    }

}