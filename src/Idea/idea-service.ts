import type { IProductRepository } from "../Product/interfaces/repositories/iproduct-repository.js"
import type { IUserRepository } from "../User/interfaces/repositories/iuser-repository.js"
import type { IIdeaRepository } from "./interfaces/repositories/iidea-repository.js"
import type { IIdeaService } from "./interfaces/services/iidea-service.js"

export class IdeaService implements IIdeaService{

    constructor(private readonly IideaRepository: IIdeaRepository,
        private readonly IproductRepository: IProductRepository,
        private readonly IuserRepository: IUserRepository
    ) { }

    public async findAll() {
        return await this.IideaRepository.findAll()
    }

    public async findByID(id: number) {
        return await this.IideaRepository.findByID(id)
    }

    public async findByUserID(userid: number) {
        return await this.IideaRepository.findByUserID(userid)
    }

    public async findByProductID(productid: number) {
        return await this.IideaRepository.findByProductID(productid)
    }

    public async findByUserProductID(userid: number, productid: number) {
        return await this.IideaRepository.findByUserProductID(userid, productid)
    }

    public async Add(ideaInfo: any) {
        const idea = await this.IideaRepository.findByUserProductID(ideaInfo.UserID, ideaInfo.ProductID)
        if (idea && idea.length > 0) return { Status: 400, Message: "User already recorded the idea for this product" }
        const product = await this.IproductRepository.findByID(ideaInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const user = await this.IuserRepository.findByID(ideaInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.IideaRepository.Add(ideaInfo.UserID, ideaInfo.ProductID, ideaInfo.Score, ideaInfo.Comment)
        const avg = await this.IideaRepository.findAVGScore(ideaInfo.ProductID)
        await this.IproductRepository.setScore(ideaInfo.ProductID, avg![0].AVG)
        return { Status: 200, Message: "Adding was successful." }
    }

    public async Update(ideaInfo: any) {
        const idea = await this.IideaRepository.findByID(ideaInfo.ID)
        if (!idea || idea.length === 0) return { Status: 400, Message: "Idea does not exist." }
        const product = await this.IproductRepository.findByID(ideaInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const user = await this.IuserRepository.findByID(ideaInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.IideaRepository.Update(ideaInfo.ID, ideaInfo.UserID, ideaInfo.ProductID, ideaInfo.Score, ideaInfo.Comment)
        const avg = await this.IideaRepository.findAVGScore(ideaInfo.ProductID)
        await this.IproductRepository.setScore(ideaInfo.ProductID, avg![0].AVG)
        return { Status: 200, Message: "Updatig was successful." }
    }

    public async Delete(ideaInfo: any) {
        const idea = await this.IideaRepository.findByID(ideaInfo.ID)
        if (!idea || idea.length === 0) return { Status: 400, Message: "Idea does not exist." }
        const product = await this.IproductRepository.findByID(ideaInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const user = await this.IuserRepository.findByID(ideaInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.IideaRepository.Delete(ideaInfo.ID)
        const avg = await this.IideaRepository.findAVGScore(ideaInfo.ProductID)
        await this.IproductRepository.setScore(ideaInfo.ProductID, avg![0].AVG)
        return { Status: 200, Message: "Deleting was successful." }
    }

}