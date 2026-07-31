import type { IdeaRepository } from "./idea-repository.js"
import type { ProductRepository } from "../Product/product-repository.js"
import type { UserRepository } from "../User/user-repository.js"
import type { IIdeaService } from "./interfaces/services/iidea-service.js"

export class IdeaService implements IIdeaService{

    constructor(private readonly ideaRepository: IdeaRepository,
        private readonly productRepository: ProductRepository,
        private readonly userRepository: UserRepository
    ) { }

    public async findAll() {
        return await this.ideaRepository.findAll()
    }

    public async findByID(id: number) {
        return await this.ideaRepository.findByID(id)
    }

    public async findByUserID(userid: number) {
        return await this.ideaRepository.findByUserID(userid)
    }

    public async findByProductID(productid: number) {
        return await this.ideaRepository.findByProductID(productid)
    }

    public async findByUserProductID(userid: number, productid: number) {
        return await this.ideaRepository.findByUserProductID(userid, productid)
    }

    public async Add(ideaInfo: any) {
        const idea = await this.ideaRepository.findByUserProductID(ideaInfo.UserID, ideaInfo.ProductID)
        if (idea && idea.length > 0) return { Status: 400, Message: "User already recorded the idea for this product" }
        const product = await this.productRepository.findByID(ideaInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const user = await this.userRepository.findByID(ideaInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.ideaRepository.Add(ideaInfo.UserID, ideaInfo.ProductID, ideaInfo.Score, ideaInfo.Comment)
        const avg = await this.ideaRepository.findAVGScore(ideaInfo.ProductID)
        await this.productRepository.setScore(ideaInfo.ProductID, avg![0].AVG)
        return { Status: 200, Message: "Adding was successful." }
    }

    public async Update(ideaInfo: any) {
        const idea = await this.ideaRepository.findByID(ideaInfo.ID)
        if (!idea || idea.length === 0) return { Status: 400, Message: "Idea does not exist." }
        const product = await this.productRepository.findByID(ideaInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const user = await this.userRepository.findByID(ideaInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.ideaRepository.Update(ideaInfo.ID, ideaInfo.UserID, ideaInfo.ProductID, ideaInfo.Score, ideaInfo.Comment)
        const avg = await this.ideaRepository.findAVGScore(ideaInfo.ProductID)
        await this.productRepository.setScore(ideaInfo.ProductID, avg![0].AVG)
        return { Status: 200, Message: "Updatig was successful." }
    }

    public async Delete(ideaInfo: any) {
        const idea = await this.ideaRepository.findByID(ideaInfo.ID)
        if (!idea || idea.length === 0) return { Status: 400, Message: "Idea does not exist." }
        const product = await this.productRepository.findByID(ideaInfo.ProductID)
        if (!product || product.length === 0) return { Status: 400, Message: "Product does not exist." }
        const user = await this.userRepository.findByID(ideaInfo.UserID)
        if (!user || user.length === 0) return { Status: 400, Message: "User does not exist." }
        await this.ideaRepository.Delete(ideaInfo.ID)
        const avg = await this.ideaRepository.findAVGScore(ideaInfo.ProductID)
        await this.productRepository.setScore(ideaInfo.ProductID, avg![0].AVG)
        return { Status: 200, Message: "Deleting was successful." }
    }

}