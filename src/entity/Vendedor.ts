import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Factura } from "./Factura";

@Entity()
export class Vendedor {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: 'Debe indicar el ID' })
  Codigo_Vendedor: number;

  @Column()
  Nombre_Vendedor: string;

  @Column()
  Apellido_Vendedor: string;

  @Column()
  Direccion_Vendedor: string;

  @Column()
  Telefono_Vendedor: string;

  @Column()
  Celular_Vendedor: string;

  @OneToMany(() => Factura, (factura) => factura.vendedor)
  facturas: Factura[];
}
