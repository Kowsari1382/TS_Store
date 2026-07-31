import { PoolPromise } from "../utilities/PoolPromiseDB.js";
import sql from "mssql";
import type { ICartRepository } from "./interfaces/repositories/icart-repository.js";

export class CartRepository implements ICartRepository {
    constructor() { }

    public async findAll() {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        const result = await request.query("select * from Cart")
        return result.recordset
    }

    public async findByUserID(userid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        const result = await request.query("select * from Cart where UserID = @UserID")
        return result.recordset
    }

    public async findByProductID(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select * from Cart where ProductID = @ProductID")
        return result.recordset
    }

    public async findByUserProductID(userid: number, productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select * from Cart where UserID = @UserID and ProductID = @ProductID")
        return result.recordset
    }

    public async findTotalPrice(userid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        const result = await request.query("select SUM(Cart.Number * Products.Price) as TotalPrice from Cart, Products where Cart.ProductID = Products.ID and UserID = @UserID")
        return result.recordset
    }

    public async Add(userid: number, productid: number, number: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        request.input("Number", sql.Int, number)
        await request.query("insert into Cart(UserID, ProductID, Number) values(@UserID, @ProductID, @Number)")
    }

    public async Update(userid: number, productid: number, number: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        request.input("Number", sql.Int, number)
        await request.query("update Cart set Number = @Number where UserID = @UserID and ProductID = @ProductID")
    }

    public async Plus(userid: number, productid: number, number: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        request.input("Number", sql.Int, number)
        await request.query("update Cart set Number = Number + @Number where UserID = @UserID and ProductID = @ProductID")
    }

    public async Minus(userid: number, productid: number, number: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        request.input("Number", sql.Int, number)
        await request.query("update Cart set Number = Number - @Number where UserID = @UserID and ProductID = @ProductID")
    }

    public async DeleteByProductID(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        await request.query("delete Cart where ProductID = @ProductID")
    }

    public async DeleteByUserID(userid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        await request.query("delete Cart where UserID = @UserID")
    }

    public async Delete(userid: number, productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        await request.query("delete Cart where UserID = @UserID and ProductID = @ProductID")
    }

    public async Reset(userid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        await request.query(`
            update Cart set Number = Number - (select Number from Cart as c where UserID = @UserID and c.ProductID = Cart.ProductID)
            where ProductID in (select ProductID from Cart where UserID = @UserID) and UserID <> @UserID
            `)
    }

    public async Clean() {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        await request.query("delete Cart where Number <= 0")
    }

}