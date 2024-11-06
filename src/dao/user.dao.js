const UsuarioModel = require('./models/usuarios.model.js');

class UserDao {
    async findById(id) {
        return await UsuarioModel.findById(id).populate('cart'); 
    }

    async findOne(query) {
        return await UsuarioModel.findOne(query); 
    }

    async save(userData) {
        
        const user = new UsuarioModel({
            first_name:userData.nombre,
            last_name: userData.apellido,
            email: userData.email,
            age: userData.edad,
            password:userData.password,
            cart: userData.cart,  
            role: userData.role}); 
        return await user.save(); 
    }

    async update(id, userData) {
        return await UsuarioModel.findByIdAndUpdate(id, userData); 
    }

    async delete(id) {
        return await UsuarioModel.findByIdAndDelete(id); 
    }
}

module.exports = new UserDao();