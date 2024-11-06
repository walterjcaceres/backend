const UserServices = require('../services/user.service.js');


class UserController {

    async registerUser(req,res){
        
            let usuario = req.body;
        
        try {
        
            if (!usuario.email || !usuario.password) {
                return res.status(400).send("El email y el password son obligatorios");
            }


            await UserServices.registerUser(usuario);

            return res.status(201).redirect("/api/sessions/login");
    
            
        } catch (error) {
            if(error.message==="El usuario ya existe"){
                return res.status(409).send(error.message);
            }
            
            res.status(500).send("Error del servidor");
        }
    }


    async loginUser(req,res) {
 
        let {email,password} = req.body;
        try {
                
            const token = await UserServices.loginUser(email,password);

            if(token.message=="Credenciales incorrectas"){
                res.status(401).send(token.message);
            } else {
                res.cookie("coderCookieToken",token,{maxAge:3600000,httpOnly:true});        
                res.redirect("/api/sessions/current");
            }
    
        }     
        catch (error) {

            res.status(500).send("Error del servidor");
        }  
    }

    async getUser(req,res) {
        
            let userId = req.params.uid;
        
            console.log(userId);
            try {
                
                const user = await UserServices.getUserById(userId); 
                
                if(user){
                    res.status(200).json(user); 
                } else {
                    res.status(404).send("No se encuentra un usuario con ese ID");
                }
            } catch (error) {
                res.status(500).send("Error al obtener el usuario"); 
            }
        }



}

module.exports = new UserController();