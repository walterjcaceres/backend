const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../dao/db/product-manager-db"); 
const manager = new ProductManager();


//Listar todos los productos: 

router.get("/", async (req, res) => {
    const page=req.query.page||1;
    const limit = req.query.limit||10;
    let sort = req.query.sort||null;
    const query = req.query.query||null;
    let objetosort;
    if(sort==="asc"){
        objetosort={
            price:1
        }
    }
    if(sort==="desc"){
        objetosort={
            price:-1
        }
    }
    
    try {
        const arrayProductos = await manager.getProducts(limit,page,objetosort,query); 
        const respuesta = {
            status:"success",
            payload:arrayProductos.docs,
            totalDocs:arrayProductos.totalDocs,
            limit:arrayProductos.limit,
            totalPages:arrayProductos.totalPages,
            page:arrayProductos.page,
            pagingCounter:arrayProductos.pagingCounter,
            hasPrevPage:arrayProductos.hasPrevPage,
            hasNextPage:arrayProductos.hasNextPage,
            prevPage:arrayProductos.prevPage,
            nextPage:arrayProductos.nextPage }
        res.send(respuesta); 
    } catch (error) {
        res.status(500).send({status:"error"})
    }
})

//Buscar producto por id: 

router.get("/:pid", async (req, res) => {
    let pid = req.params.pid; 
    try {
        const producto = await manager.getProductById(pid); 
        if(!producto) {
            res.status(404).send("Producto no encontrado"); 
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
        
        if (!producto.title || !producto.description || !producto.price || !producto.code || !producto.stock || !producto.code ||!producto.category) {
            res.status(400).send("Todos los campos son obligatorios");

        } else {
                const productoAñadido = await manager.addProduct(producto); 
                productoAñadido==="El producto es unico, ya existe un producto con ese codigo"?res.status(409).send(productoAñadido):res.status(201).send(productoAñadido);
            }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


router.put("/:pid", async(req,res)=>{
    let pid = req.params.pid;
    let productoNuevo = req.body;
    try {
        if (!productoNuevo.title || !productoNuevo.description || !productoNuevo.price || !productoNuevo.code || !productoNuevo.stock || !productoNuevo.code ||!productoNuevo.category) {
            res.status(400).send("Todos los campos son obligatorios");

        } else {
            let respuesta = await manager.updateProduct(pid,productoNuevo);
           if(respuesta){
                respuesta==="El producto es unico, ya existe un producto con ese codigo"?res.status(409).send(respuesta):res.status(201).send("Actualizado correctamente");
            } else {
                res.status(404).send("Producto no encontrado");
            }
        }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
    
})

router.delete("/:pid", async(req,res)=>{
    let pid = req.params.pid;
    try {
        let respuesta = await manager.deleteProduct(pid); 
        if(respuesta){
            res.status(204).send("Eliminado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
       
    } catch (error) {
        res.status(500).send("Error del servidor")
    }

})

    

module.exports = router; 

