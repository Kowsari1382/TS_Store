import sql from "mssql";
import dotenv from "dotenv"
dotenv.config()

const config = {
    server: process.env.server!,
    database: process.env.database!,
    user: process.env.user!,
    password: process.env.password!,
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export const PoolPromise = new sql.ConnectionPool(config).connect().then((pool) => {
    console.log('Server connected to PoolPromise')
    return pool
}).catch((err) => {
    if(err) return console.log(err)
})