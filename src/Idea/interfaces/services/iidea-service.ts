export interface IIdeaService{
    findAll(): any;
    findByID(id: number): any;
    findByUserID(userid: number): any;
    findByProductID(productid: number): any;
    findByUserProductID(userid: number, productid: number): any;
    Add(ideaInfo: any): any;
    Update(ideaInfo: any): any;
    Delete(ideaInfo: any): any;
}