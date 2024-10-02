const express = require("express");
const router = express.Router();
const UserManager = require("../dao/db/user-manager-db"); 
const userManager = new UserManager(); 


const UsuarioModel = require("../dao/models/usuarios.model.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { createHash, isValidPassword } = require("../utils/util.js")
// const CartManager = require("../dao/db/cart-manager-db"); 
// const cartManager = new CartManager(); 


router.post("/api/sessions/register", async (req,res) => {
    let usuario = req.body;
    
    try {
        const existeUsuario = await UsuarioModel.findOne({email:usuario.email});
        

        if(existeUsuario){
            return res.status(400).send("El Usuario ya existe!");
        }
        

        if (!usuario.email || !usuario.password) {
            res.status(400).send("El email y el password son obligatorios");

        } else {
            
                const usuarioAñadido = await userManager.addUser(usuario); 
                usuarioAñadido==="Ya existe un usuario con ese email"?res.status(409).send(usuarioAñadido):res.status(201).redirect("/api/sessions/login");
                
            }
        
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
});

router.post("/api/sessions/login", async (req,res) => {
    let {email,password} = req.body;
    try {
        const usuarioEncontrado = await UsuarioModel.findOne({email});
       

        if(!usuarioEncontrado){
            return res.status(404).send("El Usuario no existe!");
        }

       
        if(!isValidPassword(password,usuarioEncontrado)){
            return res.status(401).send("Clave incorrecta!");
        }
        console.log(usuarioEncontrado);

       //await UserManager.loginUser(usuarioEncontrado);

        const token = jwt.sign({
            first_name:usuarioEncontrado.first_name,
            last_name:usuarioEncontrado.last_name,
            email:usuarioEncontrado.email,
            age:usuarioEncontrado.age,
            cart:usuarioEncontrado.cart,
            role:usuarioEncontrado.role
        },"coderhouse",{expiresIn:"1hr"});

        res.cookie("coderCookieToken",token,{maxAge:3600000,httpOnly:true});

        res.redirect("/api/sessions/current");
               
    }     
    catch (error) {
        res.status(500).send("Error del servidor");
    }  
});

// router.get("/current", passport.authenticate("current",{session:false}),(req,res)=>  {
//     res.render("bienvenido",{nombre: req.user.nombre});
// })


router.get("/:uid", async (req, res) => {
    let userId = req.params.uid;

    console.log(userId);
    try {
        
        const user = await userManager.getUserById(userId); 
        
        if(user){
            res.status(200).json(user); 
        } else {
            res.status(404).send("No se encuentra un usuario con ese ID");
        }
    } catch (error) {
        res.status(500).send("Error al obtener el usuario"); 
    }
})




module.exports = router;