import { PoolPromise } from "../utilities/PoolPromiseDB.js";
import sql from "mssql"
import type { IProductRepository } from "./interfaces/repositories/iproduct-repository.js";

export class ProductRepository implements IProductRepository {
    constructor() { }

    public async findAll() {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        const result = await request.query("select * from Products")
        return result.recordset
    }

    public async findByID(id: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        const result = await request.query("select * from Products where ID = @ID")
        return result.recordset
    }

    public async findByProductname(productname: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Productname", sql.NVarChar, productname)
        const result = await request.query("select * from Products where Productname = @Productname")
        return result.recordset
    }

    public async findByCategory(category: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Category", sql.NVarChar, category)
        const result = await request.query("select * from Products where Category = @Category")
        return result.recordset
    }

    public async findAllAttributes() {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        const result = await request.query("select * from ProductAttr")
        return result.recordset
    }

    public async findByProductIDAttributes(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select * from ProductAttr where ProductID = @ProductID")
        return result.recordset
    }

    public async Add(productname: string, description: string, price: number, stock: number, category: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Productname", sql.NVarChar, productname)
        request.input("Description", sql.NVarChar, description)
        request.input("Price", sql.Float, price)
        request.input("Stock", sql.Int, stock)
        request.input("Category", sql.NVarChar, category)
        await request.query("insert into Products(Productname, Description, Price, Stock, Category) values(@Productname, @Description, @Price, @Stock, @Category)")
    }

    public async Update(id: number, productname: string, description: string, price: number, stock: number, category: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        request.input("Productname", sql.NVarChar, productname)
        request.input("Description", sql.NVarChar, description)
        request.input("Price", sql.Float, price)
        request.input("Stock", sql.Int, stock)
        request.input("Category", sql.NVarChar, category)
        await request.query("update Products set Productname = @Productname, Description = @Description, Price = @Price, Stock = @Stock, Category = @Category where ID = @ID")
    }

    public async setScore(id: number, score: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        request.input("Score", sql.Float, score)
        await request.query("update Products set Score = @Score where ID = @ID")
    }

    public async Delete(id: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        await request.query("delete Products where ID = @ID")
    }

    public async Reset(userid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        await request.query(`
            update Products set Stock = Stock - (select Number from Cart as c where UserID = @UserID and c.ProductID = Products.ID)
            where ID in (select ProductID from Cart where UserID = @UserID)
            `)
    }

    public async AddAttributes(productid: number, attribute: string, value: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        request.input("Attribute", sql.NVarChar, attribute)
        request.input("Value", sql.NVarChar, value)
        await request.query("insert into ProductAttr(ProductID, Attribute, Value) values(@ProductID, @Attribute, @Value)")
    }

    public async DeleteAttributes(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        await request.query("delete ProductAttr where ProductID = @ProductID")
    }

    public async findImgByProductID(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select * from ProductImg where ProductID = @ProductID")
        return result.recordset
    }
    
    public async findSomeImgByProductID(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select ProductID, PageNumber from ProductImg where ProductID = @ProductID")
        return result.recordset
    }

    public async findImgByProductIDPageNumber(productid: number, pagenumber: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        request.input("PageNumber", sql.Int, pagenumber)
        const result = await request.query("select * from ProductImg where ProductID = @ProductID and PageNumber = @PageNumber")
        return result.recordset
    }

    public async AddImg(productid: number, pagenumber: number, path: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        request.input("PageNumber", sql.Int, pagenumber)
        request.input("Path", sql.NVarChar, path)
        await request.query("insert into ProductImg(ProductID, PageNumber, Path) values(@ProductID, @PageNumber, @Path)")
    }

    public async UpdateImg(productid: number, pagenumber: number, path: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        request.input("PageNumber", sql.Int, pagenumber)
        request.input("Path", sql.NVarChar, path)
        await request.query("update ProductImg set Path = @Path where ProductID = @ProductID and PageNumber = @PageNumber")
    }

    public async DeleteImg(productid: number, pagenumber: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        request.input("PageNumber", sql.Int, pagenumber)
        await request.query("delete ProductImg where ProductID = @ProductID and PageNumber = @PageNumber")
    }

    public async DeleteImgs(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        await request.query("delete ProductImg where ProductID = @ProductID")
    }

}