
const express = require("express"); 
const router = express.Router(); 
const CartManager = require("../managers/cart-manager.js"); 
const cartManager = new CartManager("./src/data/carts.json"); 

 

//1) Ruta post que cree un carrito nuevo.

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito(); 
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error del servidor, vamos a re morir de antrax");
    }
})


router.get("/", async (req, res) => {

    try {
        const carrito = await cartManager.getCarritos(); 
        res.json(carrito); 
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito"); 
    }
})

router.get("/:cid", async (req, res) => {
    let carritoId = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCarritoById(carritoId); 
        res.json(carrito.products); 
    } catch (error) {
        res.status(500).send("Error al obtener los productos del carrito, rata de dos patas!"); 
    }
})


//3) Agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    let carritoId = parseInt(req.params.cid); 
    let productoId = req.params.pid; 
    let quantity = req.body.quantity || 1; 

    try {
        const actualizado = await cartManager.agregarProductosAlCarrito(carritoId, productoId, quantity); 
        res.json(actualizado.products); 
    } catch (error) {
        res.status(500).send("Error al agregar un producto, moriremos");
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
