export interface IOrderService{
    findAll(): any;
    findByUserID(userid: number): any;
    findByProductID(productid: number): any;
    Add(userid: number): any;
    Update(orderInfo: any): any;
    Delete(id: number): any;
}