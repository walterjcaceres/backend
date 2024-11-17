const express = require("express");
const router = express.Router();

const passport = require("passport");
const { soloUser } = require('../middleware/auth.js');
const CartServices = require("../services/cart.service.js");
const ticketService = require("../services/ticket.service.js");



router.get("/cart", passport.authenticate("current", { session: false }), soloUser, async (req, res) => {

    let carritoId = req.user.cart;
    const resultado = await CartServices.getCartById(carritoId);
    const carrito = resultado.products.map(item => {
        const { ...spread } = item.toObject();
        return spread;
    })

    console.log("carrito del cart",carrito);
    res.render("carts", { carrito, carritoId })
})

router.get("/purchase", passport.authenticate("current", { session: false }), soloUser, async (req, res) => {
 
    const email = req.user.email;    
    let carritoId = req.user.cart;

    const compra = await ticketService.Purchase(carritoId,email);
    const carrito=compra.sinStock.map(item => {
        const { ...spread } = item.toObject();
        return spread;
    });
    const ticket=JSON.parse(JSON.stringify(compra.ticket));
    console.log("ticket:",ticket)


    res.render("purchase", {carritoId,email,carrito,ticket})
})





module.exports = router; 