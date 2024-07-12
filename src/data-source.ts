import "reflect-metadata"
import { DataSource } from "typeorm"
import { Productos } from "./entity/Productos"
import { Categoria } from "./entity/Categoria"
import { Cliente } from "./entity/Cliente"
import { DetalleFactura } from "./entity/DetalleFactura"
import { Factura } from "./entity/Factura"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "practica",
    synchronize: true,
    logging: false,
    entities: [Categoria, Cliente, DetalleFactura, Factura, Productos, Proveedor, Vendedor],
    migrations: [],
    subscribers: [],
})
