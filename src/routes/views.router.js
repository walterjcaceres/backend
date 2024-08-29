const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-manager-db"); 
const manager = new ProductManager();
//const ProductManager = require("./src/dao/fs/product-manager.js"); 
//const manager = new ProductManager("./dao/fs/productos.json");

router.get("/",async(req,res)=>{
    const page=req.query.page||1;
    const limit = req.query.limit||2;
    let sort = req.query.sort||null;
    if(sort==="asc"){
        sort={
            price:1
        }
    }
    if(sort==="desc"){
        sort={
            price:-1
        }
    }
    
    
    const arrayProductos = await manager.getProducts(limit,page,sort);
    const resultado = arrayProductos.docs.map(item=>{
        const {...spread}=item.toObject();
        return spread;
    })
    console.log(arrayProductos);
    res.render("home",{
        producto:resultado,
        hasPrevPage:arrayProductos.hasPrevPage,
        hasNextPage:arrayProductos.hasNextPage,
        prevPage:arrayProductos.prevPage,
        nextPage:arrayProductos.nextPage,
        page:arrayProductos.page,
        totalPages:arrayProductos.totalPages

    })

})

router.get("/realTimeProducts",async(req,res)=>{
    const arrayProductos = await manager.getProducts();
    res.render("realTimeProducts",{arrayProductos})

})


module.exports = router; 