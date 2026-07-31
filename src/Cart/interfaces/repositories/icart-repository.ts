export interface ICartRepository{
    findAll(): any;
    findByUserID(userid: number): any;
    findByProductID(productid: number): any;
    findByUserProductID(userid: number, productid: number): any;
    findTotalPrice(userid: number): any;
    Add(userid: number, productid: number, number: number): any;
    Update(userid: number, productid: number, number: number): any;
    Plus(userid: number, productid: number, number: number): any;
    Minus(userid: number, productid: number, number: number): any;
    DeleteByProductID(productid: number): any;
    DeleteByUserID(userid: number): any;
    Delete(userid: number, productid: number): any;
    Reset(userid: number): any;
    Clean(): any;
}