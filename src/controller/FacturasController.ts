import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entity/Factura";
import { Cliente } from "../entity/Cliente";
import { DetalleFactura } from "../entity/DetalleFactura";
import { Vendedor } from "../entity/Vendedor";
import { validate} from "class-validator";
import { Productos } from "../entity/Productos";

class FacturasController {

  static getAll = async (req: Request, res: Response) => {
    try {
      const repoFactura = AppDataSource.getRepository(Factura);

      const listaFacturas = await repoFactura.find({
        relations: ['cliente', 'vendedor', 'detallesFactura.producto']
      });

      if (listaFacturas.length === 0) {
        return res.status(404).json({ message: "No hay facturas registradas." });
      }

      return res.status(200).json(listaFacturas);
    } catch (error) {
      return res.status(400).json({ message: "Error al acceder a las facturas." });
    }
  }

    static getOne = async (req: Request, res: Response) => {

        try {
            const id = parseInt(req.params['id']);

            const repo = AppDataSource.getRepository(Factura);

            try {
                const factura = await repo.findOneOrFail({where:{Numero:id}, relations: {cliente: true, vendedor:true, detallesFactura:true}})
                return res.status(200).json(factura)
            } catch (error) {
                return res.status(404).json({message:`No se ha encontrado la factura con el id${id}`})
            }
        } catch (error) {
            return res.status(400).json({message:"Error al acceder a la base de datos"});
        }
    }

    static create = async (req: Request, res: Response) => {
      const repoFactura = AppDataSource.getRepository(Factura);
  
      try {
        const { fecha, clienteID, vendedorID, detallesFactura } = req.body;
  
        let factura = new Factura();
        factura.fecha = new Date(fecha);
  
        // Validar cliente y vendedor
        const repoCliente = AppDataSource.getRepository(Cliente);
        const repoVendedor = AppDataSource.getRepository(Vendedor);
        const cliente = await repoCliente.findOneOrFail({ where: { Ruc_Cliente: clienteID } });
        const vendedor = await repoVendedor.findOneOrFail({ where: { Codigo_Vendedor: vendedorID } });
        factura.cliente = cliente;
        factura.vendedor = vendedor;
  
        // Crear detalles de factura
        const repoProducto = AppDataSource.getRepository(Productos);
        let detalles = [];
  
        for (let detalle of detallesFactura) {
          let detalleFactura = new DetalleFactura();
          detalleFactura.factura = factura;
  
          const producto = await repoProducto.findOneOrFail({ where: { id: detalle.Codigo_Producto } });
          detalleFactura.producto = producto;
          detalleFactura.cantidad = detalle.cantidad;
  
          detalles.push(detalleFactura);
        }
  
        factura.detallesFactura = detalles;
  
        // Validar factura y detalles de factura
        const errores = await validate(factura);
        if (errores.length > 0) {
          return res.status(400).json(errores);
        }
  
        // Guardar factura y detalles de factura
        await repoFactura.save(factura);
  
        return res.status(200).json({ message: "Factura creada correctamente" });
      } catch (error) {
        return res.status(400).json({ message: "Error al guardar factura" });
      }
    };

    static delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params['id']);

            if (!id) {
                return res.status(400).json({ message: "Debe indicar el ID" });
            }

            const repo = AppDataSource.getRepository(Factura);

            let factura;
            try {
                factura = await repo.findOneOrFail({ where: { Numero: id }, relations: { cliente: true, vendedor: true, detallesFactura: true } });
            } catch (error) {
                return res.status(404).json({ message: "La factura con el ID indicado no existe en la base de datos." });
            }

            await repo.remove(factura);
            return res.status(200).json({ message: "Factura eliminada correctamente." });

        } catch (error) {
            return res.status(400).json({ message: "Error al eliminar la factura." });
        }
    }
}

export default FacturasController;
