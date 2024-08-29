
const express = require("express"); 
const router = express.Router(); 
const CartManager = require("../dao/db/cart-manager-db"); 
const cartManager = new CartManager(); 

 

//1) Ruta post que cree un carrito nuevo.

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito(); 
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
})


router.get("/", async (req, res) => {

    try {
        const carrito = await cartManager.getCarritos(); 
        res.json(carrito); 
    } catch (error) {
        res.status(500).send("Error al obtener los carritos"); 
    }
})

router.get("/:cid", async (req, res) => {
    let carritoId = req.params.cid;

    try {
        const carrito = await cartManager.getCarritoById(carritoId); 
        res.json(carrito.products); 
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
        res.json(actualizado.products); 
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

router.delete("/:cid", async (req,res)=>{
    try {
        let carritoId = req.params.cid;
        let respuesta = await cartManager.EliminarCarrito(carritoId);
        res.send(respuesta)
    } catch (error) {
        res.status(500).send("Error al eliminar el carrito");
    }
    
})

router.delete("/:cid/product/:pid", async (req,res)=>{
    try {
        let carritoId = req.params.cid;
        let productoId = req.params.pid;
        let respuesta = await cartManager.EliminarProductoDelCarrito(carritoId,productoId);
        res.send(respuesta)
    } catch (error) {
        res.status(500).send("Error al eliminar el carrito");
    }
    
})



module.exports = router; 


// let ultIdCart=0;



// //carrito

// app.get("/carts",(req,res)=>{
//     res.send(carritos)
// })

// app.get("/carts/:cid",(req,res)=>{
//     let cid = req.params.cid;
//     let carritoBuscado = carritos.find( carrito => carrito.id === parseInt(cid));
//     if(carritoBuscado){
//         res.send(carritoBuscado.products)
//     } else {
//         res.send("Carrito no encontrado")
//     }
    
// })

// app.post("/carts",(req,res)=>{
//     let products = req.body;
    
//     let id=++ultIdCart;
//     carritos.push({id,products});
//     res.send("Carrito añadido");

// })

// app.post("/carts/:cid/products/:pid",(req,res)=>{
//     let productoNuevo = req.body;
//     let cid = req.params.cid;
//     let pid = req.params.pid;
//     console.log(cid);
//      console.log(pid);
    
//     let carritoBuscado = carritos.findIndex( carrito => carrito.id === parseInt(cid));
//     if(carritoBuscado>-1){
//         let productoBuscado = carritos[carritoBuscado].products.findIndex( producto => producto.id === parseInt(pid));
//         if(productoBuscado>-1){
//             carritos[carritoBuscado].products[productoBuscado].quantity+=productoNuevo.quantity;
//             res.send("Cantidad modificada");
//         } else {
//             carritos[carritoBuscado].products.push(productoNuevo);
//             res.send("Producto agregado")
//         }
//     } else {
//          res.send("Carrito no encontrado")
//     }

// })



// // // // // // // //put de carts no solicitado

// // // // // // // // app.put("/carts/:cid",(req,res)=>{
// // // // // // // //     let cid = parseInt(req.params.cid);
// // // // // // // //     let carritoNuevo = req.body;
// // // // // // // //     let carritoBuscado = carritos.findIndex( carrito => carrito.id === cid);
// // // // // // // //     if(carritoBuscado>-1){
// // // // // // // //         carritos[carritoBuscado]={id:cid,...carritoNuevo};
// // // // // // // //         res.send("Carrito actualizado");
// // // // // // // //     } else {
// // // // // // // //         res.send("Carrito no encontrado")
// // // // // // // //     }
    
// // // // // // // // })

// app.delete("/carts/:cid",(req,res)=>{
//     let cid = req.params.cid;
//     let carritoBuscado = carritos.findIndex( carrito => carrito.id === parseInt(cid));
//     if(carritoBuscado>-1){
//         carritos.splice(carritoBuscado,1);
//         res.send("Carrito eliminado");
//     } else {
//         res.send("Carrito no encontrado")
//     }
// })
