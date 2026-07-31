import express from "express";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import type { IIdeaController } from "./interfaces/controllers/iidea-controller.js";
const router = express.Router()

export const ideas = (Icontroller: IIdeaController) => {
    
    router.get("/all", Icontroller.findAll)
    router.get("/id/:id", Icontroller.findByID)
    router.get("/userid/:id", Icontroller.findByUserID)
    router.get("/productid/:id", Icontroller.findByProductID)
    router.get("/userproductid/:userid/:productid", Icontroller.findByUserProductID)
    router.post("/add",CheckAuth, Icontroller.Add)
    router.put("/update",CheckAuth, Icontroller.Update)
    router.delete("/delete",CheckAuth, Icontroller.Delete)
    
    return router;
}