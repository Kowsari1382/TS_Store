import express from "express";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import { CheckAdmin } from "../middlewares/CheckAdmin.js";
import type { ICartController } from "./interfaces/controllers/icart-controller.js";
const router = express.Router()

export const carts = (Icontroller: ICartController) => {

    router.get("/all", CheckAuth, CheckAdmin, Icontroller.findAll)
    router.get("/userid/:id", CheckAuth, Icontroller.findByUserID)
    router.get("/productid/:id", CheckAuth, CheckAdmin, Icontroller.findByProductID)
    router.get("/userproductid/:userid/:productid", CheckAuth, CheckAdmin, Icontroller.findByUserProductID)
    router.post("/add", CheckAuth, Icontroller.Add)
    router.post("/minus", CheckAuth, Icontroller.Minus)
    router.delete("/delete", CheckAuth, Icontroller.Delete)
    router.delete("/userdelete/:id", CheckAuth, Icontroller.DeleteByUserID)
    router.delete("/productdelete/:id", CheckAuth, CheckAdmin, Icontroller.DeleteByProductID)

    return router;
}