import express from "express";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import { CheckAdmin } from "../middlewares/CheckAdmin.js";
import type { IOrderController } from "./interfaces/controllers/iorder-controller.js";
const router = express.Router()

export const orders = (Icontroller: IOrderController) => {

    router.get("/all", CheckAuth, CheckAdmin, Icontroller.findAll)
    router.get("/userid/:id", CheckAuth, Icontroller.findByUserID)
    router.get("/productid/:id", CheckAuth, CheckAdmin, Icontroller.findByProductID)
    // router.get("/verify", Icontroller.Verify)
    router.post("/add", CheckAuth, Icontroller.Add)
    router.put("/update", CheckAuth, CheckAdmin, Icontroller.Update)
    router.delete("/delete/:id", CheckAuth, CheckAdmin, Icontroller.Delete)

    return router;
}