import express from "express";
import { IdeaController } from "./idea-controller.js";
import { CheckAuth } from "../middlewares/CheckAuth.js";
const router = express.Router()

export const ideas = (controller: IdeaController) => {
    
    router.get("/all", controller.findAll)
    router.get("/id/:id", controller.findByID)
    router.get("/userid/:id", controller.findByUserID)
    router.get("/productid/:id", controller.findByProductID)
    router.get("/userproductid/:userid/:productid", controller.findByUserProductID)
    router.post("/add",CheckAuth, controller.Add)
    router.put("/update",CheckAuth, controller.Update)
    router.delete("/delete",CheckAuth, controller.Delete)
    
    return router;
}