const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../dao/db/product-manager-db"); 
const manager = new ProductManager();
//const productoModel=require("../dao/models/productos.model.js");

//Listar todos los productos: 

router.get("/", async (req, res) => {
    
    try {
        const arrayProductos = await manager.getProducts(); 
        //const arrayProductos = await productoModel.find();
        res.send(arrayProductos); 
    } catch (error) {
        res.status(500).send("Error al obtener los productos")
    }
})

//Buscar producto por id: 

router.get("/:pid", async (req, res) => {
    let pid = req.params.pid; 
    try {
        const producto = await manager.getProductById(id); 
        //const producto = await productoModel.findById(pid)
        if(!producto) {
            res.send("Producto no encontrado"); 
        } else {
            res.status(200).send(producto); 
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos"); 
    }
})

router.post("/", async(req,res)=>{
    let producto = req.body;
   
    try {
        
        if (!producto.title || !producto.description || !producto.price || !producto.code || !producto.stock) {
            res.send("Todos los campos son obligatorios");

        } else {
                const productoAñadido = await manager.addProduct(producto); 
                //const productoAñadido = new productoModel(producto);
                res.status(201).send("Producto añadido");
            }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


router.put("/:pid", async(req,res)=>{
    let pid = req.params.pid;
    let productoNuevo = req.body;
    try {
        let respuesta = await manager.updateProduct(pid,productoNuevo); 
        //let respuesta = await productoModel.findByIdAndUpdate(pid,productoNuevo);
        if(respuesta){
            res.status(201).send("Actualizado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
       
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
    
})

router.delete("/:pid", async(req,res)=>{
    let pid = req.params.pid;
    try {
        let respuesta = await manager.deleteProduct(pid); 
        //let respuesta = await productoModel.findByIdAndDelete(pid);
        if(respuesta){
            res.status(200).send("Eliminado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
       
    } catch (error) {
        res.status(500).send("Error del servidor")
    }

})

    

module.exports = router; 

