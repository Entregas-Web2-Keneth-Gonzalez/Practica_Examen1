import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Factura } from "./Factura";
import { Productos } from "./Productos";
import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";

@Entity()
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Factura, factura => factura.detallesFactura)
  factura: Factura;
  
  @ManyToOne(() => Productos, producto => producto.detallesFactura)
  producto: Productos;

  @IsNumber({message : "Solo valores numericos"})
  @IsNotEmpty({message : "Debe indicar la cantidad"})
  @Column()
  cantidad: number;

}
