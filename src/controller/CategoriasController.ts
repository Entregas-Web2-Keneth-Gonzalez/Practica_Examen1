import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/Categoria";

class CategoriasController{

    static getAll= async(req: Request, res:Response)=>{
            
       try {
        //instancia bd
         const repo= AppDataSource.getRepository(Categoria);
         //consulta de bd x metodo find
         const lista= await repo.find({where:{estado:true}, relations:{productos:true}});

        // valido si trajo datos, sino devuelvo error
         if(lista.length==0){
            return res.status(404).json({message:"No hay datos registrados."})
         }
         return res.status(200).json(lista);
        
       } catch (error) {
        return res.status(400).json({message:"Error al accedder a la base datos."})
      
       }       
    }

    static getOne= async(req: Request, res:Response)=>{

        try {
            const id = parseInt(req.params['id']);

            //validacion de mas, por lo que vimos en clase.
            if(!id){
                return res.status(400).json({message:"Debe indicar el ID"})
            }

            const repo= AppDataSource.getRepository(Categoria);

            try {
                const categoria= await repo.findOneOrFail({where:{id, estado:true}, relations:{productos:true}});  
                return res.status(200).json(categoria);
            } catch (error) {
                return res.status(404).json({message:"La categoria con el ID indcado no existe en el base de datos."})
            }

        } catch (error) {
            return res.status(404).json({message:"Error al guardr la categoria."})
           
        }

    }
}
export default CategoriasController;