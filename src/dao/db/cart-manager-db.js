const cartModel = require("../models/carts.model.js")


class CartManager {
    

    //Primer consigna crear el carrito: 

    async crearCarrito(){
        try {
            const nuevoCarrito = new cartModel({
                products: []
            })
               
            await nuevoCarrito.save(); 
            return nuevoCarrito;
        } catch (error) {
            return null;
        }
    }

    async getCarritos(){
        try {
            const carritos = await cartModel.find();
            return carritos;
            
        } catch (error) {
            console.log("Error al obtener los carritos"); 
            throw error; 
        }
    }

    //Retorne un carrito por id:

    async getCarritoById(carritoId) {
        try {
            let carrito = await cartModel.findById(carritoId);
            if(carrito) {
            carrito = await cartModel.findById(carritoId).populate('products.product');
                return carrito; 
            } else {
               return null;
            }
            
        } catch (error) {
            console.log("Error al obtener el carrito por id"); 
            throw error; 
        }
    }

    //Agregar productos al carrito: 

    async agregarProductosAlCarrito(carritoId, productoId, quantity) {
        try {
            const carrito = await cartModel.findById(carritoId)
        if(carrito){
            const existeProducto = carrito.products.find(p => p.product == productoId);
            if(existeProducto) {
                existeProducto.quantity += quantity; 
            } else {
                const arrayproductoId=[];
                arrayproductoId.push(productoId);
                carrito.products.push({product: arrayproductoId, quantity});
            }
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } else {
            console.log("No existe el carrito con ese ID")
            return null;
        }
        } catch (error) {
            console.log("Error al actualizar el carrito por id"); 
            throw error; 
        }
    }

    async modificarProductosAlCarrito(carritoId, productoId, quantity){
        try {
            const carrito = await cartModel.findById(carritoId)
        if(carrito){
            const existeProducto = carrito.products.find(p => p.product == productoId);
            if(existeProducto) {
                existeProducto.quantity = quantity; 
                carrito.markModified("products");
            await carrito.save();
            return carrito;
            } else {
                return "No existe el producto a modificar";
            }
        } else {
            return "No existe el carrito con ese ID";
        }
        } catch (error) {
            console.log("Error al actualizar el carrito por id"); 
            throw error; 
        }
    }

    async actualizarCarritoConArray(carritoId,array){
        console.log("1")
    try {
        const carrito = await cartModel.findById(carritoId)
        console.log(carrito);
    if(carrito){
        
        carrito.products=array;
        carrito.markModified("products");
        await carrito.save();
        return carrito;
        
    } else {
        return "No existe el carrito con ese ID";
    }
    } catch (error) {
        console.log("Error al actualizar el carrito por id"); 
        throw error; 
    }
}

    async EliminarCarrito(carritoId){
        try {
            const carrito = await cartModel.findByIdAndDelete(carritoId);
                if(carrito){
            return ("Carrito eliminado")
            } else {
                return ("No se encontro el carrito")
            }
        } catch (error) {
            console.log("Error al eliminar el carrito por id"); 
            throw error; 
        }
    }

    async EliminarProductoDelCarrito(carritoId,productoId){
        try {
            const carrito = await cartModel.findById(carritoId)
            if(carrito){
                const productoBuscado = carrito.products.findIndex(p => p.product == productoId);
                if(productoBuscado>-1) {
                    carrito.products.splice(productoBuscado,1);
                    carrito.markModified("products");
                    await carrito.save();
                    return carrito;
                } else {
                    console.log("No existe un producto con ese ID en este carrito")
                    return "No se encuentra el producto";
                }
                
            } else {
                console.log("No existe el carrito con ese ID")
                return null;
            }
        } catch (error) {
            console.log("Error al eliminar el producto del carrito por id"); 
            throw error;
        }
    }
}

module.exports = CartManager; 