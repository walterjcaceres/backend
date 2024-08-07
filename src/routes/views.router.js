const express = require("express");
const router = express.Router();
const ProductManager = require("../managers/product-manager.js"); 
const manager = new ProductManager("./src/data/productos.json");

router.get("/",async(req,res)=>{
    const arrayProductos = await manager.getProducts();
    res.render("home",{arrayProductos})

})

router.get("/realTimeProducts",async(req,res)=>{
    const arrayProductos = await manager.getProducts();
    res.render("realTimeProducts",{arrayProductos})

    

})


module.exports = router; 