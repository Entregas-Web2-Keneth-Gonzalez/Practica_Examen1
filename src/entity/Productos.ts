import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Proveedor } from "./Proveedor";
import { DetalleFactura } from "./DetalleFactura";
import { Categoria } from "./Categoria";

@Entity()
export class Productos {
  @PrimaryColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  precio: number;

  @Column()
  stock: number;

  @Column({default:1})
  estado: boolean;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  proveedor: Proveedor;

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.producto)
  detallesFactura: DetalleFactura[];
}
