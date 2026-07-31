import express from "express";
import { CartController } from "../Cart/cart-controller.js";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import { CheckAdmin } from "../middlewares/CheckAdmin.js";
const router = express.Router()

export const carts = (controller: CartController) => {

    router.get("/all", CheckAuth, CheckAdmin, controller.findAll)
    router.get("/userid/:id", CheckAuth, controller.findByUserID)
    router.get("/productid/:id", CheckAuth, CheckAdmin, controller.findByProductID)
    router.get("/userproductid/:userid/:productid", CheckAuth, CheckAdmin, controller.findByUserProductID)
    router.post("/add", CheckAuth, controller.Add)
    router.post("/minus", CheckAuth, controller.Minus)
    router.delete("/delete", CheckAuth, controller.Delete)
    router.delete("/userdelete/:id", CheckAuth, controller.DeleteByUserID)
    router.delete("/productdelete/:id", CheckAuth, CheckAdmin, controller.DeleteByProductID)

    return router;
}