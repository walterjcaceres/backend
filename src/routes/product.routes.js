
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



module.exports = router; 


// let ultId=0;

// app.get("/products",(req,res)=>{
//     res.send(productos)
// })

// app.get("/products/:pid",(req,res)=>{
//     let pid = req.params.pid;
//     let productoBuscado = productos.find( producto => producto.id === parseInt(pid));
//     if(productoBuscado){
//         res.send(productoBuscado)
//     } else {
//         res.send("Producto no encontrado")
//     }
    
// })

// app.post("/products",(req,res)=>{
//     let producto = req.body;
    
//     if(producto.title&&producto.description&&producto.code&&producto.price&&producto.stock&&producto.category){
//         let id=++ultId;
//         productos.push({id,...producto,status:true});
//         res.send("producto añadido");
//     } else {
//         res.send("Todos los campos son obligatorios");
//     }
    
// })

// app.put("/products/:pid",(req,res)=>{
//     let pid = parseInt(req.params.pid);
//     let productoNuevo = req.body;
//     let productoBuscado = productos.findIndex( producto => producto.id === pid);
//     if(productoBuscado>-1){
//         productos[productoBuscado]={id:pid,...productoNuevo};
//         res.send("producto actualizado");
//     } else {
//         res.send("Producto no encontrado")
//     }
    
// })

// app.delete("/products/:pid",(req,res)=>{
//     let pid = req.params.pid;
//     let productoBuscado = productos.findIndex( producto => producto.id === parseInt(pid));
//     if(productoBuscado>-1){
//         productos.splice(productoBuscado,1);
//         res.send("producto eliminado");
//     } else {
//         res.send("Producto no encontrado")
//     }
// })