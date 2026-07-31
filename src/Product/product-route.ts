import express from "express";
import { CheckAdmin } from "../middlewares/CheckAdmin.js";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import { image } from "../utilities/multer.js";
import type { IProductController } from "./interfaces/controllers/iproduct-controller.js";
const router = express.Router();

export const products = (Icontroller: IProductController) => {

    router.get("/all", Icontroller.findAll)
    router.get("/id/:id", Icontroller.findByID)
    router.get("/attr/:id", Icontroller.findByProductIDAttributes)
    router.get("/name/:productname", Icontroller.findByProductname)
    router.get("/category/:category", Icontroller.findByCategory)
    router.get("/imginfo/:id", Icontroller.findSomeImgByProductID)
    router.get("/img/:id/:pagenumber", Icontroller.findImgByProductIDPageNumber)
    router.post("/add", CheckAuth, CheckAdmin, Icontroller.Add)
    router.post("/addimg", CheckAuth, CheckAdmin, image.single("image"), Icontroller.AddImg)
    router.put("/updateimg", CheckAuth, CheckAdmin, image.single("image"), Icontroller.UpdateImg)
    router.put("/update", CheckAuth, CheckAdmin, Icontroller.Update)
    router.put("/score", CheckAuth, CheckAdmin, Icontroller.setScore)
    router.delete("/delete/:id", CheckAuth, CheckAdmin, Icontroller.Delete)
    router.delete("/deleteimg/:productid/:pagenumber", CheckAuth, CheckAdmin, Icontroller.DeleteImg)

    return router;
}