import { PoolPromise } from "../utilities/PoolPromiseDB.js";
import sql from "mssql"

export class UserRepository {
    constructor() { }

    public async findAll() {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        const result = await request.query("select * from Users")
        return result.recordset
    }

    public async findByID(id: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        const result = await request.query("select * from Users where ID = @ID")
        return result.recordset
    }

    public async findByUsername(username: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Username", sql.NVarChar, username)
        const result = await request.query("select * from Users where Username = @Username")
        return result.recordset
    }

    public async Register(username: string, password: string, number: string, email: string, bio: string, address: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Username", sql.NVarChar, username)
        request.input("Password", sql.NVarChar, password)
        request.input("Number", sql.NVarChar, number)
        request.input("Email", sql.NVarChar, email)
        request.input("Bio", sql.NVarChar, bio)
        request.input("Address", sql.NVarChar, address)
        await request.query("insert into Users(Username, Password, Number, Email, Bio, Address, Role) values(@Username, @Password, @Number, @Email, @Bio, @Address, 'User')")
    }

    public async Add(username: string, password: string, number: string, email: string, bio: string, address: string, role: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("Username", sql.NVarChar, username)
        request.input("Password", sql.NVarChar, password)
        request.input("Number", sql.NVarChar, number)
        request.input("Email", sql.NVarChar, email)
        request.input("Bio", sql.NVarChar, bio)
        request.input("Address", sql.NVarChar, address)
        request.input("Role", sql.NVarChar, role)
        await request.query("insert into Users(Username, Password, Number, Email, Bio, Address, Role) values(@Username, @Password, @Number, @Email, @Bio, @Address, @Role)")
    }

    public async Update(id: number, username: any, password: any, number: any, email: any, bio: any, address: any, role: any) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        request.input("Username", sql.NVarChar, username)
        request.input("Password", sql.NVarChar, password)
        request.input("Number", sql.NVarChar, number)
        request.input("Email", sql.NVarChar, email)
        request.input("Bio", sql.NVarChar, bio)
        request.input("Address", sql.NVarChar, address)
        request.input("Role", sql.NVarChar, role)
        await request.query(`
            update Users set 
            Username = @Username,
            Password = @Password,
            Number = @Number,
            Email = @Email,
            Bio = @Bio,
            Address = @Address,
            Role = @Role
            where ID = @ID
            `)
    }

    public async Edit(id: number, username: any, password: any, number: any, email: any, bio: any, address: any) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        request.input("Username", sql.NVarChar, username)
        request.input("Password", sql.NVarChar, password)
        request.input("Number", sql.NVarChar, number)
        request.input("Email", sql.NVarChar, email)
        request.input("Bio", sql.NVarChar, bio)
        request.input("Address", sql.NVarChar, address)
        await request.query(`
            update Users set 
            Username = @Username,
            Password = @Password,
            Number = @Number,
            Email = @Email,
            Bio = @Bio,
            Address = @Address
            where ID = @ID
            `)
    }

    public async Delete(id: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        await request.query("delete Users where ID = @ID")
    }

    public async UpdateAvatar(id: number, avatar: string) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        request.input("Avatar", sql.NVarChar, avatar)
        await request.query("update Users set Avatar = @Avatar where ID = @ID")
    }


    public async DeleteAvatar(id: number) {
        const pool = await PoolPromise
        if (pool instanceof sql.ConnectionPool === false) return
        const request = pool.request()
        request.input("ID", sql.Int, id)
        await request.query("update Users set Avatar = Null where ID = @ID")
    }

}