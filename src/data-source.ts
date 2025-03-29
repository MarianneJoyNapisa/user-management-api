import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { createConnection } from "mysql2/promise"

export const ensureDbExists = async () => {
    const connection = await createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        })
    await connection.query("CREATE DATABASE IF NOT EXISTS `node-mysql-crud-api`")
}
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "node-mysql-crud-api",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
