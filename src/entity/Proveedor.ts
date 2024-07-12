import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "./Productos";

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  Codigo_Proveedor: number;

  @Column()
  Nombre_Proveedor: string;

  @Column()
  Apellido_Proveedor: string;

  @Column()
  Direccion_Proveedor: string;

  @Column()
  Provincia_Proveedor: string;

  @Column()
  Telefono_Proveedor: string;

  @OneToMany(() => Productos, (productos) => productos.proveedor)
  productos: Productos[];
}
