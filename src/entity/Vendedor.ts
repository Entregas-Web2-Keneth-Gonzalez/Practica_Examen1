import { IsNotEmpty, MaxLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Factura } from "./Factura";

@Entity()
export class Vendedor {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: 'Debe indicar el ID' })
  Codigo_Vendedor: number;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el nombre.' })
  @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
  Nombre_Vendedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el apellido.' })
  @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
  Apellido_Vendedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar la direccion.' })
  @MaxLength(500, { message: 'Debe contener un máximo de 500 caracteres.' })
  Direccion_Vendedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el telefono.' })
  @MaxLength(8, { message: 'Debe contener un máximo de 8 caracteres.' })
  Telefono_Vendedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el celular.' })
  @MaxLength(8, { message: 'Debe contener un máximo de 8 caracteres.' })
  Celular_Vendedor: string;

  @OneToMany(() => Factura, (factura) => factura.vendedor)
  facturas: Factura[];
}
