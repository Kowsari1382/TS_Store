export interface IOrderRepository{
    findAll(): any;
    findByID(id: number): any;
    findByUserID(userid: number): any;
    findByProductID(productid: number): any;
    findPayment(authority: string): any;
    AddPayment(authority: string, userid: number, totalprice: number): any;
    DeletePayment(authority: string): any;
    AddForUser(userid: number): any;
    Add(userid: number, productid: number, number: number, totalprice: number, state: string): any;
    Update(id: number, userid: number, productid: number, number: number, totalprice: number, state: string): any;
    Delete(id: number): any;
}