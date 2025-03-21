import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_LOGIN,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    .promise();
