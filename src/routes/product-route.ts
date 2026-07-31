import express from "express";
import { ProductController } from "../Product/product-controller.js";
import { CheckAdmin } from "../middlewares/CheckAdmin.js";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import { image } from "../utilities/multer.js";
const router = express.Router();

export const products = (controller: ProductController) => {

    router.get("/all", controller.findAll)
    router.get("/id/:id", controller.findByID)
    router.get("/attr/:id", controller.findByProductIDAttributes)
    router.get("/name/:productname", controller.findByProductname)
    router.get("/category/:category", controller.findByCategory)
    router.get("/imginfo/:id", controller.findSomeImgByProductID)
    router.get("/img/:id/:pagenumber", controller.findImgByProductIDPageNumber)
    router.post("/add", CheckAuth, CheckAdmin, controller.Add)
    router.post("/addimg", CheckAuth, CheckAdmin, image.single("image"), controller.AddImg)
    router.put("/updateimg", CheckAuth, CheckAdmin, image.single("image"), controller.UpdateImg)
    router.put("/update", CheckAuth, CheckAdmin, controller.Update)
    router.put("/score", CheckAuth, CheckAdmin, controller.setScore)
    router.delete("/delete/:id", CheckAuth, CheckAdmin, controller.Delete)
    router.delete("/deleteimg/:productid/:pagenumber", CheckAuth, CheckAdmin, controller.DeleteImg)

    return router;
}