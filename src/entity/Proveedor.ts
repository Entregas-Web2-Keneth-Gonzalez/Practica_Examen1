import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productos } from "./Productos";
import { MaxLength, IsNotEmpty } from "class-validator";

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  Codigo_Proveedor: number;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el nombre.' })
  @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
  Nombre_Proveedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el apellido.' })
  @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
  Apellido_Proveedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar la direccion.' })
  @MaxLength(500, { message: 'Debe contener un máximo de 500 caracteres.' })
  Direccion_Proveedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar ka provincia.' })
  @MaxLength(50, { message: 'Debe contener un máximo de 50 caracteres.' })
  Provincia_Proveedor: string;

  @Column()
  @IsNotEmpty({ message: 'Debe indicar el telefono.' })
  @MaxLength(8, { message: 'Debe contener un máximo de 8 caracteres.' })
  Telefono_Proveedor: string;

  @OneToMany(() => Productos, (productos) => productos.proveedor)
  productos: Productos[];
}
