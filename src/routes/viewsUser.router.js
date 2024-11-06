const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserDTO = require('../dto/user.dto.js')


router.get("/login",(req,res)=>{ 
    res.render("login");
})

router.get("/register",(req,res)=>{ 
    res.render("register");
})

router.get("/current", passport.authenticate("current",{session:false}),(req,res)=>  {
    const user=req.user
    const userDTO = new UserDTO(user);
    res.render("bienvenido",{
        //first_name:userDTO.first_name,
        //last_name:userDTO.last_name,
        email:userDTO.email,
        //age:usuarioEncontrado.age,
        //cart:usuarioEncontrado.cart,
        role:userDTO.role});
})

router.get("/logout",(req,res)=>{ 
    res.clearCookie("coderCookieToken");
    res.render("login");
})


module.exports = router; 