import express from "express";
import { OrderController } from "../Order/order-controller.js";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import { CheckAdmin } from "../middlewares/CheckAdmin.js";
const router = express.Router()

export const orders = (controller: OrderController) => {

    router.get("/all", CheckAuth, CheckAdmin, controller.findAll)
    router.get("/userid/:id", CheckAuth, controller.findByUserID)
    router.get("/productid/:id", CheckAuth, CheckAdmin, controller.findByProductID)
    // router.get("/verify", controller.Verify)
    router.post("/add", CheckAuth, controller.Add)
    router.put("/update", CheckAuth, CheckAdmin, controller.Update)
    router.delete("/delete/:id", CheckAuth, CheckAdmin, controller.Delete)

    return router;
}