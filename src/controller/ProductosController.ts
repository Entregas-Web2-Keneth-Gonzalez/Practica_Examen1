import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../entity/Productos";
import { validate } from "class-validator";
import { Categoria } from "../entity/Categoria";
import { Proveedor } from "../entity/Proveedor";

class ProductosController{

    static getAll= async(req: Request, res:Response)=>{
           
       try {
        //instancia bd
         const repo= AppDataSource.getRepository(Productos);
         //consulta de bd x metodo find
         const listaProductos= await repo.find({where:{estado:true}, relations:{categoria:true}});

        // valido si trajo datos, sino devuelvo error
         if(listaProductos.length==0){
            return res.status(404).json({message:"No hay datos registrados."})
         }
         return res.status(200).json(listaProductos);
        
       } catch (error) {
        return res.status(400).json({message:"Error al accedder a la base datos."})
      
       }       
    }

    static create = async(req: Request, res: Response) => {
        const repoProducto = AppDataSource.getRepository(Productos);

        try {
            // Destructuring de los datos recibidos en el body de la solicitud
            const { id, nombre, precio, stock, categoria, proveedor } = req.body;

            // Verificar si ya existe un producto con el mismo id (si aplica a tu caso)
            let product = await repoProducto.findOne({ where: { id } });
            if (product) {
                return res.status(400).json({ message: "Ese producto ya existe en la base de datos." });
            }

            // Instanciar un nuevo objeto Producto
            product = new Productos();
            product.id = id;
            product.nombre = nombre;
            product.precio = precio;
            product.stock = stock;
            product.estado = true;

            // Validar el producto usando class-validator
            const errors = await validate(product);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            // Validar y vincular la categoría
            const repoCategoria = AppDataSource.getRepository(Categoria);
            let cat;
            try {
                cat = await repoCategoria.findOneOrFail({ where: { id: categoria } });
            } catch (ex) {
                return res.status(400).json({ message: "No existe la categoría." });
            }
            product.categoria = cat;

            // Validar y vincular el proveedor
            const repoProveedor = AppDataSource.getRepository(Proveedor);
            let prov;
            try {
                prov = await repoProveedor.findOneOrFail({ where: { Codigo_Proveedor: proveedor } });
            } catch (ex) {
                return res.status(400).json({ message: "No existe el proveedor." });
            }
            product.proveedor = prov;

            // Guardar el producto en la base de datos
            await repoProducto.save(product);

            // Respuesta de éxito
            return res.status(200).json({ message: "Producto guardado correctamente.", producto: product });

        } catch (error) {
            // Manejo de errores
            console.error("Error al guardar el producto:", error);
            return res.status(400).json({ message: "Error al guardar el producto." });
        }
    }

    static getOne= async(req: Request, res:Response)=>{

        try {
            const id = parseInt(req.params['id']);

            //validacion de mas, por lo que vimos en clase.
            if(!id){
                return res.status(400).json({message:"Debe indicar el ID"})
            }

            const repo= AppDataSource.getRepository(Productos);

            try {
                const producto= await repo.findOneOrFail({where:{id, estado:true}, relations:{categoria:true}});  
                return res.status(200).json(producto);
            } catch (error) {
                return res.status(404).json({message:"El producto con el ID indcado no existe en el base de datos."})
            }       

        } catch (error) {
            return res.status(404).json({message:"El producto con el ID indcado no existe en el base de datos."})
           
        }

    }

    static update= async(req: Request, res:Response)=>{

        try {
            const repo= AppDataSource.getRepository(Productos);

            const id = parseInt(req.params['id']);
            //destructuracion
            const {nombre, precio, stock, categoria}= req.body;
          
         //valido si existe en la base datos
            let producto;
            try {
                producto = await repo.findOneOrFail({where:{id}});  
         
            } catch (error) {
                return res.status(404).json({message:"El producto con el ID indcado no existe en el base de datos."})
            }

            //volcado de datos
            producto.nombre= nombre;
            producto.precio=precio;
            producto.categoria=categoria;
            producto.stock=stock;

             //validacion con class validator
           
             const errors= await validate(producto,{validationError:{target:false, value:false}});
 
             //VALIDO LA CATEGORIA
            const repoCategoria =  AppDataSource.getRepository(Categoria);
            let cat;
            try {
              cat= await repoCategoria.findOneOrFail({where:{id:categoria}})
                
            } catch (ex) {
                return res.status(400).json({messsage:"No existe la categoria."})
            }
           producto.categoria= cat;

            //modifico
            await repo.save(producto);
            //retorno mensaje de modificado OK.      
            return res.status(200).json({message:"El producto ha sido modificado."});

        } catch (error) {
            return res.status(404).json({message:"Error al actualizar el producto."})
           
        }

    }
    static delete= async(req: Request, res:Response)=>{

        try {
            const id = parseInt(req.params['id']);

            //validacion de mas, por lo que vimos en clase.
            if(!id){
                return res.status(400).json({message:"Debe indicar el ID"})
            }

            const repo= AppDataSource.getRepository(Productos);

            let producto;
            try {
                producto= await repo.findOneOrFail({where:{id}});
                
              } catch (error) {
                return res.status(404).json({message:"El producto con el ID indcado no existe en el base de datos."})
            }

            //modificacion
          
            producto.estado=false;
            await repo.save(producto);  
            return res.status(200).json({message:"El producto ha sido eliminado."});    

        } catch (error) {
            return res.status(404).json({message:"Error al eliminar el producto."})
           
        }

    }

}
export default ProductosController;