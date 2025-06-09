import mysql from "mysql2/promise"
import dotenv from 'dotenv'
dotenv.config()

export const dbConnection =mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE
})