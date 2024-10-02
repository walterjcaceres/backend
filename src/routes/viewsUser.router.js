const express = require("express");
const router = express.Router();
const passport = require("passport");


router.get("/login",(req,res)=>{ 
    res.render("login");
})

router.get("/register",(req,res)=>{ 
    res.render("register");
})

router.get("/current", passport.authenticate("current",{session:false}),(req,res)=>  {
    usuarioEncontrado=req.user
    res.render("bienvenido",{
        first_name:usuarioEncontrado.first_name,
        last_name:usuarioEncontrado.last_name,
        email:usuarioEncontrado.email,
        age:usuarioEncontrado.age,
        cart:usuarioEncontrado.cart,
        role:usuarioEncontrado.role});
})

router.get("/logout",(req,res)=>{ 
    res.clearCookie("coderCookieToken");
    res.render("login");
})


module.exports = router; 