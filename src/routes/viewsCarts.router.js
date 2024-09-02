const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js"); 
const manager = new CartManager();
//const ProductManager = require("./src/dao/fs/product-manager.js"); 
//const manager = new ProductManager("./dao/fs/productos.json");

router.get("/:cid",async(req,res)=>{
    let carritoId=req.params.cid;
    const resultado = await manager.getCarritoById(carritoId)
    const carrito = resultado.products.map(item=>{
        const {...spread}=item.toObject();
        return spread;
    })
    console.log(carrito);

    res.render("carts",{carrito,carritoId})
})

module.exports = router; 