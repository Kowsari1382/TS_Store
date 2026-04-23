import { PoolPromise } from "../utilities/PoolPromiseDB.js";
import sql from "mssql";

export class IdeaRepository {

    constructor() { }

    public async findAll() {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        const result = await request.query("select * from Ideas")
        return result.recordset
    }

    public async findByID(id: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        const result = await request.query("select * from Ideas where ID = @ID")
        return result.recordset
    }

    public async findByUserID(userid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        const result = await request.query("select * from Ideas where UserID = @UserID")
        return result.recordset
    }

    public async findByProductID(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select * from Ideas where ProductID = @ProductID")
        return result.recordset
    }

    public async findByUserProductID(userid: number, productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select * from Ideas where UserID = @UserID and ProductID = @ProductID")
        return result.recordset
    }

    public async findAVGScore(productid: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ProductID", sql.Int, productid)
        const result = await request.query("select AVG(Score) as AVG from Ideas where ProductID = @ProductID")
        return result.recordset
    }

    public async Add(userid: number, productid: number, score: number, comment: string){
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        request.input("Score", sql.Float, score)
        request.input("Comment", sql.NVarChar, comment)
        await request.query("insert into Ideas(UserID, ProductID, Score, Comment) values(@UserID, @ProductID, @Score, @Comment)")
    }

    public async Update(id: number, userid: number, productid: number, score: number, comment: string){
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        request.input("UserID", sql.Int, userid)
        request.input("ProductID", sql.Int, productid)
        request.input("Score", sql.Float, score)
        request.input("Comment", sql.NVarChar, comment)
        await request.query("update Ideas set UserID = @UserID, ProductID = @ProductID, Score = @Score, Comment = @Comment where ID = @ID")
    }

    public async Delete(id: number){
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        await request.query("delete Ideas where ID = @ID")
    }

}