
import mysql from "mysql2/promise";
import config from "../config/config.js";


const connection = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    database: config.db_name,
    port: config.db_port,
    password: config.db_password
});

async function testConnectionMySQL() {
    try {
        await connection.getConnection();
        console.log("Conexion a MySQL correcta!");
    } catch (error) {
        console.log(error);
    }
}

testConnectionMySQL();

module.exports = connection;