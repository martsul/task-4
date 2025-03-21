import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql
    .createPool({
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
    .promise();
