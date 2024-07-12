import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { MaxLength, IsNotEmpty } from "class-validator";
import { Factura } from "./Factura";

@Entity()
export class Cliente {
  @PrimaryColumn()
  @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
  @IsNotEmpty({ message: 'Debe indicar el Ruc del cliente.' })
  Ruc_Cliente: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el nombre del cliente.' })
  Nombre_Cliente: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el apellido del cliente.' })
  Apellido_Cliente: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar la dirección del cliente.' })
  Direccion_Cliente: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el teléfono del cliente.' })
  Telefono_Cliente: string;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];
}
