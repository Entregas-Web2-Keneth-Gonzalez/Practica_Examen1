import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Factura } from "./Factura";
import { Productos } from "./Productos";

@Entity()
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Factura, factura => factura.detallesFactura)
  factura: Factura;
  
  @ManyToOne(() => Productos, producto => producto.detallesFactura)
  producto: Productos;

  @Column()
  cantidad: number;

}
