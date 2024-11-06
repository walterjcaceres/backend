const cartModel = require('./models/carts.model.js');

class CartDao{
    async saveNew(){
        
        const nuevoCarrito = new cartModel({
            products: []
        })
               
        await nuevoCarrito.save(); 
        return nuevoCarrito;
       
    }

    async find(){
        const carritos = await cartModel.find().populate('products.product');
        return carritos;  
    }

    async findById(id){

        const carrito = await cartModel.findById(id).populate('products.product');

        return carrito; 
    }

    async findByIdAndUpdate(id,array){

        const carrito = await cartModel.findByIdAndUpdate(id,array,{ new: true });
        return carrito;
    }

    async deleteById(id){
        const carrito = await cartModel.findByIdAndDelete(id);
        return carrito;
    }



}

module.exports = new CartDao();