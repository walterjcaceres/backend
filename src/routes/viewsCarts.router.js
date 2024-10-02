const express = require("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js"); 
const manager = new CartManager();
const passport = require("passport");
//const ProductManager = require("./src/dao/fs/product-manager.js"); 
//const manager = new ProductManager("./dao/fs/productos.json");

//router.get("/:cid",async(req,res)=>{
    router.get("/cart", passport.authenticate("current",{session:false}),async(req,res)=>  {
   //     res.render("bienvenido",{nombre: req.user.nombre});
  //  })    
    let carritoId=req.user.cart;
    const resultado = await manager.getCarritoById(carritoId)
    const carrito = resultado.products.map(item=>{
        const {...spread}=item.toObject();
        return spread;
    })
     

    res.render("carts",{carrito,carritoId})
})

module.exports = router; 