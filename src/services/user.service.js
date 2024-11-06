const UserRepository = require('../repositories/user.repository.js');
const { createHash, isValidPassword } = require('../utils/util.js');
const CartServices = require('../services/cart.service.js');
const jwt = require("jsonwebtoken");


class UserServices {
    
    async registerUser(userData) {
        
        const existingUser = await UserRepository.getUserByEmail(userData.email);
        if(existingUser) throw new Error("El usuario ya existe");  
      
        
        const nuevoCarrito = await CartServices.addCart();     
        
        userData.password = createHash(userData.password); 
        userData.cart=nuevoCarrito;
        userData.role="user";

            return await UserRepository.createUser(userData); 
    }




    async loginUser(email, password) {
        
        const user = await UserRepository.getUserByEmail(email); 
       
      
        if(!user) {return new Error("Credenciales incorrectas")}; 
        
        if(!isValidPassword(password, user)) {return new Error("Credenciales incorrectas")};
     
        const token = jwt.sign({
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            age:user.age,
            cart:user.cart,
            role:user.role
        },"coderhouse",{expiresIn:"1hr"});

        return token; 
    }

    async getUserById(id) {
        return await UserRepository.getUserById(id); 
    }

    //Pueden hacer los métodos para actualizar y borrar usuarios. 
}

module.exports = new UserServices(); 