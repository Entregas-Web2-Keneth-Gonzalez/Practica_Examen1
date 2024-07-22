import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Proveedor } from "./Proveedor";
import { DetalleFactura } from "./DetalleFactura";
import { Categoria } from "./Categoria";
import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";

@Entity()
export class Productos {
  @PrimaryColumn()
  @IsNotEmpty({message : "Debe indicar el ID"})
  id: number;

  @IsNotEmpty({ message: 'Debe indicar el nombre.' })
  @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
  @Column()
  nombre: string;

  @IsNumber({message : "Solo valores numericos"})
  @IsNotEmpty({message : "Debe indicar el precio"})
  @Column()
  precio: number;

  @IsNumber({message : "Solo valores numericos"})
  @IsNotEmpty({message : "Debe indicar el stock"})
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
