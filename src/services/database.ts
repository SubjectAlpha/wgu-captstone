import { env } from "process";
import mysql from "mysql2";

export default mysql.createConnection({
    host: env.MYSQL_SERVER,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE
});
