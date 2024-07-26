const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../managers/product-manager.js"); 
const manager = new ProductManager("./src/data/productos.json");

//Listar todos los productos: 

router.get("/", async (req, res) => {
    const arrayProductos = await manager.getProducts(); 
    res.send(arrayProductos); 
})

//Buscar producto por id: 

router.get("/:pid", async (req, res) => {
    let id = req.params.pid; 
    try {
        const producto = await manager.getProductById(parseInt(id)); 

        if(!producto) {
            res.send("Producto no encontrado"); 
        } else {
            res.send(producto); 
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
                res.send("Producto añadido");
            }
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


router.put("/:pid", async(req,res)=>{
    let pid = parseInt(req.params.pid);
    let productoNuevo = req.body;
    try {
        let respuesta = await manager.updateProduct(pid,productoNuevo);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
    
})

router.delete("/:pid", async(req,res)=>{
    let pid = parseInt(req.params.pid);
    try {
        let respuesta = await manager.deleteProduct(pid);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send("Error del servidor")
    }

})

    

module.exports = router; 

