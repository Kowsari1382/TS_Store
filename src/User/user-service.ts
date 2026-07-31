import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import type { IUserService } from "./interfaces/services/iuser-service.js";
import type { IUserRepository } from "./interfaces/repositories/iuser-repository.js";
import type { ICartRepository } from "../Cart/interfaces/repositories/icart-repository.js";
dotenv.config()

export class UserService implements IUserService {

    constructor(private readonly IuserRepository: IUserRepository,
        private readonly IcartRepository: ICartRepository
    ) { }

    public async findAll() {
        return await this.IuserRepository.findAll();
    }

    public async findByID(id: number) {
        return await this.IuserRepository.findByID(id);
    }

    public async findByUsername(username: string) {
        return await this.IuserRepository.findByUsername(username);
    }

    public async findAvatar(id: number) {
        const user = await this.IuserRepository.findByID(id);
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        if (!user[0].Avatar) return { Status: 400, Message: "User does not have avatar." }
        return { Status: 200, Message: "Avatar found", Path: `${user[0].Avatar}` }
    }

    public async Register(userInfo: any) {
        const user = await this.IuserRepository.findByUsername(userInfo.Username)
        if (user && user.length > 0) return { Status: 400, Message: "User already exists." }
        const HashPassword = await bcrypt.hash(userInfo.Password, 10)
        await this.IuserRepository.Register(userInfo.Username, HashPassword, userInfo.Number, userInfo.Email, userInfo.Bio, userInfo.Address)
        const newUser: any = await this.IuserRepository.findByUsername(userInfo.Username)
        const token = jwt.sign({ ID: newUser[0].ID, Username: userInfo.Username, Role: "User" }, process.env.SecretKey!, { expiresIn: "7d" })
        return { Status: 200, Message: "Register was successful.", Authorization: token, ID: newUser[0].ID }
    }

    public async Login(userInfo: any) {
        const user = await this.IuserRepository.findByUsername(userInfo.Username)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const compareResult = await bcrypt.compare(userInfo.Password, user[0].Password)
        if (compareResult === false) return { Status: 400, Message: "Please enter correcrt password." }
        const token = jwt.sign({ ID: user[0].ID, Username: userInfo.Username, Role: user[0].Role }, process.env.SecretKey!, { expiresIn: "7d" })
        return { Status: 200, Message: "Login was successful.", Authorization: token }
    }

    public async Add(userInfo: any) {
        const user = await this.IuserRepository.findByUsername(userInfo.Username)
        if (user && user.length > 0) return { Status: 400, Message: "User already exists." }
        const HashPassword = await bcrypt.hash(userInfo.Password, 10)
        await this.IuserRepository.Add(userInfo.Username, HashPassword, userInfo.Number, userInfo.Email, userInfo.Bio, userInfo.Address, userInfo.Role)
        const newUser: any = await this.IuserRepository.findByUsername(userInfo.Username)
        const token = jwt.sign({ ID: newUser[0].ID, Username: userInfo.Username, Role: userInfo.Role }, process.env.SecretKey!, { expiresIn: "7d" })
        return { Status: 200, Message: "Adding was successful.", Authorization: token, ID: newUser[0].ID }
    }

    public async Update(userInfo: any) {
        const user = await this.IuserRepository.findByID(userInfo.ID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const HashPassword = await bcrypt.hash(userInfo.Password, 10)
        await this.IuserRepository.Update(userInfo.ID, userInfo.Username, HashPassword, userInfo.Number, userInfo.Email, userInfo.Bio, userInfo.Address, userInfo.Role)
        return { Status: 200, Message: "Update was successful." }
    }

    public async Edit(userInfo: any) {
        const user = await this.IuserRepository.findByID(userInfo.ID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        const HashPassword = await bcrypt.hash(userInfo.Password, 10)
        await this.IuserRepository.Edit(userInfo.ID, userInfo.Username, HashPassword, userInfo.Number, userInfo.Email, userInfo.Bio, userInfo.Address)
        return { Status: 200, Message: "Edit was successful." }
    }

    public async Delete(id: number) {
        const user = await this.IuserRepository.findByID(id)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.IuserRepository.Delete(id)
        await this.IcartRepository.DeleteByUserID(id)
        await this.IuserRepository.DeleteAvatar(id)
        return { Status: 200, Message: "Delete was successful." }
    }

    public async DeleteAvatar(id: number) {
        const user = await this.IuserRepository.findByID(id)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        if (!user[0].Avatar) return { Status: 400, Message: "User does not have avatar." }
        await this.IuserRepository.DeleteAvatar(id)
        return { Status: 200, Message: "Delete avatar was successful.", Path: user[0].Avatar }
    }

    public async UpdateAvatar(id: number, avatar: string) {
        await this.IuserRepository.UpdateAvatar(id, "Avatars/" + avatar)
        return { Status: 200, Message: "Avatar uploaded." }
    }

}