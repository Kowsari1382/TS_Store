import { PoolPromise } from "../utilities/PoolPromiseDB.js";
import sql from "mssql";

export class OrderRepository {

    constructor() { }

    public async findAll() {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        const result = await request.query("select * from Orders")
        return result.recordset
    }

    public async findByID(id: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        const result = await request.query("select * from Orders where ID = @ID")
        return result.recordset
    }

    public async findByUserID(userid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        const result = await request.query("select * from Orders where UserID = @UserID")
        return result.recordset
    }

    public async findByProductID(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select * from Orders where ProductID = @ProductID")
        return result.recordset
    }

    public async findPayment(authority: string){
        const pool = await PoolPromise
        if(pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Authority", sql.NVarChar, authority)
        const result = await request.query("select * from Payments where Authority = @Authority")
        return result.recordset
    }

    public async AddPayment(authority: string, userid: number, totalprice: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Authority", sql.NVarChar, authority)
        request.input("UserID", sql.Int, userid)
        request.input("TotalPrice", sql.Int, totalprice)
        await request.query("insert into Payments(Authority, UserID, TotalPrice) values(@Authority, @UserID, @TotalPrice)")
    }

    public async DeletePayment(authority: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Authority", sql.NVarChar, authority)
        await request.query("delete Payments where Authority = @Authority")
    }

    public async AddForUser(userid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        await request.query(`begin transaction insert into Orders(UserID, ProductID, Number, TotalPrice, State) (select Cart.UserID, Cart.ProductID, Cart.Number, Products.Price * Cart.Number, 'Ordered' from Cart, Products
            where Cart.ProductID = Products.ProductID and Cart.UserID = @UserID) commit
            `)
    }

    public async Add(userid: number, productid: number, number: number, totalprice: number, state: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        request.input("Number", sql.Int, number)
        request.input("TotalPrice", sql.Int, totalprice)
        request.input("State", sql.NVarChar, state)
        await request.query("begin transaction insert into Orders(UserID, ProductID, Number, TotalPrice, State) values(@UserID, @ProductID, @Number, @TotalPrice, @State) commit")
    }

    public async Update(id: number, userid: number, productid: number, number: number, totalprice: number, state: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        request.input("Number", sql.Int, number)
        request.input("TotalPrice", sql.Int, totalprice)
        request.input("State", sql.NVarChar, state)
        await request.query("begin transaction update Orders UserID = @UserID, ProductID = @ProductID, Number = @Number, TotalPrice = @TotalPrice, State = @State where ID = @ID commit")
    }

    public async Delete(id: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        await request.query("begin transaction delete Orders where ID = @ID commit")
    }

}