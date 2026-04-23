import express from "express";
import { UserController } from "../controllers/user-controller.js";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import { CheckAdmin } from "../middlewares/CheckAdmin.js";
import { image } from "../utilities/multer.js";
const router = express.Router();

export const users = (controller: UserController) => {

    router.get("/all", CheckAuth, CheckAdmin, controller.findAll);
    router.get("/id/:id", CheckAuth, controller.findByID);
    router.get("/name/:username", CheckAuth, controller.findByUsername);
    router.get("/avatar/:id", CheckAuth, controller.findAvatar);
    router.post("/register", image.single("avatar"), controller.Register);
    router.post("/login", controller.Login);
    router.post("/add", CheckAuth, CheckAdmin, image.single("avatar"), controller.Add);
    router.put("/update", CheckAuth, CheckAdmin, image.single("avatar"), controller.Update);
    router.put("/edit", CheckAuth, image.single("avatar"), controller.Edit);
    router.delete("/delete/:id", CheckAuth, controller.Delete);
    router.delete("/deleteavatar/:id", CheckAuth, controller.DeleteAvatar);

    return router;
}