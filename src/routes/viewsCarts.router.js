const express = require("express");
const router = express.Router();
const CartController = require('../controllers/cart.controller.js')
// const CartManager = require("../dao/db/cart-manager-db.js"); 
// const manager = new CartManager();
const passport = require("passport");
const { soloUser } = require('../middleware/auth.js');
const CartServices = require("../services/cart.service.js");
//const ProductManager = require("./src/dao/fs/product-manager.js"); 
//const manager = new ProductManager("./dao/fs/productos.json");

//router.get("/:cid",async(req,res)=>{
router.get("/cart", passport.authenticate("current", { session: false }), soloUser, async (req, res) => {
    //     res.render("bienvenido",{nombre: req.user.nombre});
    //  })    
    let carritoId = req.user.cart;
    const resultado = await CartServices.getCartById(carritoId);
    const carrito = resultado.products.map(item => {
        const { ...spread } = item.toObject();
        return spread;
    })


    res.render("carts", { carrito, carritoId })
})

router.get("/purchase", passport.authenticate("current", { session: false }), soloUser, async (req, res) => {
    //     res.render("bienvenido",{nombre: req.user.nombre});
    //  })
    const email = req.user.email;    
    let carritoId = req.user.cart;
    const resultado = await CartServices.getCartById(carritoId);
    const carrito = resultado.products.map(item => {
        const { ...spread } = item.toObject();
        return spread;
    })


    res.render("purchase", {carritoId,email})
})





module.exports = router; 