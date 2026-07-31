import express from "express";
import { CheckAuth } from "../middlewares/CheckAuth.js";
import { CheckAdmin } from "../middlewares/CheckAdmin.js";
import { image } from "../utilities/multer.js";
import type { IUserController } from "./interfaces/controllers/iuser-controlle.js";
const router = express.Router();

export const users = (Icontroller: IUserController) => {

    router.get("/all", CheckAuth, CheckAdmin, Icontroller.findAll);
    router.get("/id/:id", CheckAuth, Icontroller.findByID);
    router.get("/name/:username", CheckAuth, Icontroller.findByUsername);
    router.get("/avatar/:id", CheckAuth, Icontroller.findAvatar);
    router.post("/register", image.single("avatar"), Icontroller.Register);
    router.post("/login", Icontroller.Login);
    router.post("/add", CheckAuth, CheckAdmin, image.single("avatar"), Icontroller.Add);
    router.put("/update", CheckAuth, CheckAdmin, image.single("avatar"), Icontroller.Update);
    router.put("/edit", CheckAuth, image.single("avatar"), Icontroller.Edit);
    router.delete("/delete/:id", CheckAuth, Icontroller.Delete);
    router.delete("/deleteavatar/:id", CheckAuth, Icontroller.DeleteAvatar);

    return router;
}