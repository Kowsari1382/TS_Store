export interface IIdeaRepository{
    findAll(): any;
    findByID(id: number): any;
    findByUserID(userid: number): any;
    findByProductID(productid: number): any;
    findByUserProductID(userid: number, productid: number): any;
    findAVGScore(productid: number): any;
    Add(userid: number, productid: number, score: number, comment: string): any;
    Update(id: number, userid: number, productid: number, score: number, comment: string): any;
    Delete(id: number): any;
}