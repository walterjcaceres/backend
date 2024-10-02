
const express = require("express"); 
const router = express.Router(); 
const CartManager = require("../dao/db/cart-manager-db"); 
const cartManager = new CartManager(); 

 

//1) Ruta post que cree un carrito nuevo.

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito(); 
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


router.get("/", async (req, res) => {

    try {
        const carrito = await cartManager.getCarritos(); 
        res.status(200).json(carrito); 
    } catch (error) {
        res.status(500).send("Error al obtener los carritos"); 
    }
})

router.get("/:cid", async (req, res) => {
    let carritoId = req.params.cid;

    try {
        const carrito = await cartManager.getCarritoById(carritoId); 
        if(carrito){
            res.status(200).json(carrito.products); 
        } else {
            res.status(404).send("No se encuentra un carrito con ese ID");
        }
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito"); 
    }
})


//3) Agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    let carritoId = req.params.cid; 
    let productoId = req.params.pid; 
    let quantity = req.body.quantity || 1; 

    try {
        const actualizado = await cartManager.agregarProductosAlCarrito(carritoId, productoId, quantity); 
        if(actualizado){
            res.status(201).json(actualizado.products); 
        } else {
            res.status(404).send("No se encuentra un carrito con ese ID");
        }
        
    } catch (error) {
        res.status(500).send("Error al agregar un producto");
    }
})

router.put("/:cid/product/:pid", async (req, res) => {
    let carritoId = req.params.cid; 
    let productoId = req.params.pid; 
    let quantity = req.body.quantity 

    try {
        if(quantity){
            const actualizado = await cartManager.modificarProductosAlCarrito(carritoId, productoId, quantity); 
        actualizado.products?res.status(201).send(actualizado.products):res.status(400).send(actualizado); 

        } else {
            res.status(400).send("Debe especificar una cantidad"); 
        }
        
    } catch (error) {
        res.status(500).send("Error al agregar un producto");
    }
})

router.put("/:cid", async (req, res) => {
    let carritoId = req.params.cid;  
    let products = req.body;
    
    try {
        const respuesta = await cartManager.actualizarCarritoConArray(carritoId,products);
        respuesta=="No existe el carrito con ese ID"?res.status(404).send(respuesta):res.status(201).send(respuesta)
                    
    } catch (error) {
        res.status(500).send("Error al agregar un producto");
    }
})


router.delete("/:cid", async (req,res)=>{
    try {
        let carritoId = req.params.cid;
        let respuesta = await cartManager.EliminarCarrito(carritoId);
        res.status(204).send(respuesta);
    } catch (error) {
        res.status(500).send("Error al eliminar el carrito");
    }
    
})

router.delete("/:cid/product/:pid", async (req,res)=>{
    try {
        let carritoId = req.params.cid;
        let productoId = req.params.pid;
        let respuesta = await cartManager.EliminarProductoDelCarrito(carritoId,productoId);
        if(respuesta){
            respuesta==="No se encuentra el producto"?res.status(404).send(respuesta):res.status(200).send(respuesta);
        } else {
            res.status(404).send("No se encuentra un carrito con ese ID")
        }
        
    } catch (error) {
        res.status(500).send("Error al eliminar el producto del carrito por id");
    }
    
})



module.exports = router; 


