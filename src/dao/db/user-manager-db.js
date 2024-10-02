const userModel = require("../models/usuarios.model.js");
const { createHash, isValidPassword } = require("../../utils/util.js");
const CartManager = require("../db/cart-manager-db.js"); 
const cartManager = new CartManager();
const jwt = require("jsonwebtoken");


class UserManager {

    async addUser({ nombre,apellido,email,edad,password,role }) {
        
        try {
            const existeUsuario = await userModel.findOne({email:email}) 
            
            if(existeUsuario){
                console.log("Ya existe un usuario con ese email")
                return "Ya existe un usuario con ese email";
            }
            
            const nuevoCarrito = await cartManager.crearCarrito(); 
            
            const nuevoUsuario = new userModel({
                first_name:nombre,
                last_name:apellido,
                email:email,
                age:edad,
                password:createHash(password),
                cart:nuevoCarrito,
                role:role||"user"
            })
            

            await nuevoUsuario.save();
            
            return nuevoUsuario;

        } catch (error) {
            console.log("error al cargar un nuevo usuario");
        }
    }

    async loginUser(usuarioEncontrado){
        try {
            const token = jwt.sign({usuario:usuarioEncontrado.usuario},"coderhouse",{expiresIn:"1hr"});

            res.cookie("coderCookieToken",token,{maxAge:3600000,httpOnly:true});
        } catch (error) {
            console.log("error al obtener el usuario");
        }
    }

    async getUsers(){
        try {
            const users = await userModel.find();
            return users;
            
        } catch (error) {
            console.log("Error al obtener los usuarios"); 
            throw error; 
        }
    }

    //Retorne un carrito por id:

    async getUserById(userId) {
        try {
    
            let usuario = await userModel.findById(userId);
            console.log(usuario);
            if(usuario) {
            usuario = await userModel.findById(userId).populate('cart');
                return usuario; 
            } else {
               return null;
            }
            
        } catch (error) {
            console.log("Error al obtener el usuario por id"); 
            throw error; 
        }
    }

}


module.exports = UserManager; 