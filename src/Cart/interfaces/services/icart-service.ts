export interface ICartService{
    findAll(): any;
    findByUserID(userid: number): any;
    findByProductID(productid: number): any;
    findByUserProductID(userid: number, productid: number): any;
    findTotalPrice(userid: number): any;
    Add(cartInfo: any): any;
    Update(cartInfo: any): any;
    Minus(cartInfo: any): any;
    Delete(cartInfo: any): any;
    DeleteByUserID(userid: number): any;
    DeleteByProductID(productid: number): any;
    Reset(userid: any): any;
    Clean(): any;
}