const express = require("express");
const router = express.Router();
const passport = require("passport");
const {soloAdmin, soloUser} = require('../middleware/auth.js');
// const ProductManager = require("../dao/db/product-manager-db"); 
// const manager = new ProductManager();
const viewsProductController = require ('../controllers/viewsProduct.controller.js');
//const ProductManager = require("./src/dao/fs/product-manager.js"); 
//const manager = new ProductManager("./dao/fs/productos.json");

router.get("/",passport.authenticate("current",{session:false}),soloUser,viewsProductController.getProducts);
//     const page=req.query.page||1;
//     const limit = req.query.limit||10;
//     let sort = req.query.sort||null;
//     const query = req.query.query||null;
//     let objetosort;
//     if(sort==="asc"){
//         objetosort={
//             price:1
//         }
//     }
//     if(sort==="desc"){
//         objetosort={
//             price:-1
//         }
//     }
    
    
//     const arrayProductos = await manager.getProducts(limit,page,objetosort,query);
//     const resultado = arrayProductos.docs.map(item=>{
//         const {...spread}=item.toObject();
//         return spread;
//     })
//     console.log(arrayProductos);
//     res.render("home",{
//         producto:resultado,
//         hasPrevPage:arrayProductos.hasPrevPage,
//         hasNextPage:arrayProductos.hasNextPage,
//         prevPage:arrayProductos.prevPage,
//         nextPage:arrayProductos.nextPage,
//         page:arrayProductos.page,
//         totalPages:arrayProductos.totalPages,
//         limit,
//         sort,
//         query

//     })

// })

router.get("/realTimeProducts",passport.authenticate("current",{session:false}),soloAdmin,viewsProductController.getRealTime);
    // const arrayProductos = await manager.getProducts();
    // res.render("realTimeProducts",{arrayProductos})

// })


module.exports = router; 