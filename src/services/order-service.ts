import { CartRepository } from "../repositories/cart-repository.js";
import { OrderRepository } from "../repositories/order-repository.js";
import { ProductRepository } from "../repositories/product-repository.js";
import { CartService } from "./cart-service.js";
import { ProductService } from "./product-service.js";
import ZarinPal from "zarinpal-node-sdk";

const zarinPal = new ZarinPal.default({
    merchantId: "",
    accessToken: "",
    sandbox: true
})

export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) { }

    public async findAll() {
        return await this.orderRepository.findAll()
    }

    public async findByUserID(userid: number) {
        return await this.orderRepository.findByUserID(userid)
    }

    public async findByProductID(productid: number) {
        return await this.orderRepository.findByProductID(productid)
    }

    public async Add(userid: number) {
        const cartRepository = new CartRepository()
        const cartService = new CartService(cartRepository)
        const productRepository = new ProductRepository()
        const productService = new ProductService(productRepository)
        const userCart = await cartService.findByUserID(userid)
        if (!userCart || userCart.length === 0) return { Status: 400, Message: "There is not cart for this user." }
        const totalPrice = await cartService.findTotalPrice(userid)
        //Payment is here
        await this.orderRepository.AddForUser(userid)
        await cartService.Reset(userid)
        await cartService.Clean()
        await productService.Reset(userid)
        await cartService.DeleteByUserID(userid)
        return { Status: 200, Message: "Adding was successful." }
    }

    // public async Add(userid: number) {
    //     const cartRepository = new CartRepository()
    //     const cartService = new CartService(cartRepository)
    //     const userCart = await cartService.findByUserID(userid)
    //     if (!userCart || userCart.length === 0) return { Status: 400, Message: "There is not cart for this user." }
    //     const totalPrice = await cartService.findTotalPrice(userid)
    //     const response = await zarinPal.payments.create({
    //         amount: totalPrice![0].TotalPrice,
    //         description: "پرداخت خرید محصولات",
    //         callback_url: `http://localhost:3000/api/order/verify`
    //     })
    //     await this.orderRepository.AddPayment(response.data.authority, userid, totalPrice![0].TotalPrice)
    //     return { Status: 200, Message: "OK", Zarinpal: zarinPal, Response: response }
    // }

    // public async Verify(authority: string) {
    //     const cartRepository = new CartRepository()
    //     const cartService = new CartService(cartRepository)
    //     const productRepository = new ProductRepository()
    //     const productService = new ProductService(productRepository)
    //     const payment = await this.orderRepository.findPayment(authority)
    //     if (!payment || payment.length === 0) return { Status: 400, Message: "There is not payment for this user" }
    //     const response = await zarinPal.verifications.verify({
    //         amount: payment[0].TotalPrice,
    //         authority: authority
    //     })
    //     if (response.data.code !== 100 && response.data.code !== 101) {
    //         await this.orderRepository.DeletePayment(authority)
    //         return { Status: 400, Message: "Verifying failed." }
    //     }
    //     await this.orderRepository.AddForUser(payment[0].UserID)
    //     await cartService.Reset(payment[0].UserID)
    //     await cartService.Clean()
    //     await productService.Reset(payment[0].UserID)
    //     await cartService.DeleteByUserID(payment[0].UserID)
    //     return { Status: 200, Message: "Adding was successful." }
    // }

    public async Update(orderInfo: any) {
        const userOrder = await this.orderRepository.findByUserID(orderInfo.UserID)
        if (!userOrder || userOrder.length === 0) return { Status: 400, Message: "There is not order for this user." }
        await this.orderRepository.Update(orderInfo.ID, orderInfo.UserID, orderInfo.ProductID, orderInfo.Number, orderInfo.TotalPrice, orderInfo.State)
        return { Status: 200, Message: "Updating was successful." }
    }

    public async Delete(id: number) {
        const userOrder = await this.orderRepository.findByUserID(id)
        if (!userOrder || userOrder.length === 0) return { Status: 400, Message: "There is not order for this user." }
        await this.orderRepository.Delete(id)
        return { Status: 200, Message: "Deleting was successful." }
    }

}