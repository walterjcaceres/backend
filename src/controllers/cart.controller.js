const CartServices = require('../services/cart.service.js');


class CartController{

    async createCart(req,res) {
        
        try {
            const nuevoCarrito = await CartServices.addCart(); 
            res.status(201).json(nuevoCarrito);
        } catch (error) {
            res.status(500).send("Error del servidor");
        }
    }


    async getCarts(req, res) {
        try {
            const carrito = await CartServices.getCarts(); 
            res.status(200).json(carrito); 
        } catch (error) {
            res.status(500).send("Error al obtener los carritos"); 
        }
    }

    async getCartById(req, res)  {
        let carritoId = req.params.cid;

        try {
            const carrito = await CartServices.getCartById(carritoId); 
            if(carrito){
                res.status(200).json(carrito.products); 
            } else {
                res.status(404).send("No se encuentra un carrito con ese ID");
            }
        } catch (error) {
            res.status(500).send("Error al obtener los productos del carrito"); 
        }
    }

    async getTicketById(req,res){
        return "hola";
    }


    async AddProductsToCart(req, res) {
        let carritoId = req.params.cid; 
        let productoId = req.params.pid; 
        let quantity = req.body.quantity || 1; 
        try {
            const actualizado = await CartServices.AddProductsToCart(carritoId, productoId, quantity); 
            if(actualizado){
                res.status(201).json(actualizado.products); 
            } else {
                res.status(404).send("Error al agregar un producto");
            }
            
        } catch (error) {
            res.status(500).send("Error al agregar un producto");
        }
    }

    async modifyProductsToCart(req, res)  {
        let carritoId = req.params.cid; 
        let productoId = req.params.pid; 
        let quantity = req.body.quantity 

        try {
            if(quantity){
                const actualizado = await CartServices.modifyProductsToCart(carritoId, productoId, quantity); 
            actualizado.products?res.status(201).send(actualizado.products):res.status(400).send(actualizado); 

            } else {
                res.status(400).send("Debe especificar una cantidad"); 
            }
            
        } catch (error) {
            res.status(500).send("Error al modificar el carrito");
        }
    }

    async updateCartWithArray(req, res)  {
        let carritoId = req.params.cid;  
        let products = req.body;
        
        try {
            const respuesta = await CartServices.updateCartWithArray(carritoId,products);
            respuesta=="No existe el carrito con ese ID"?res.status(404).send(respuesta):res.status(201).send(respuesta)
                        
        } catch (error) {
            res.status(500).send("Error al agregar un producto");
        }
    }


    async deleteCartById (req,res){
        let carritoId = req.params.cid;
        try {
            let respuesta = await CartServices.deleteCartById(carritoId);
            console.log(respuesta);
            respuesta?res.status(404):res.status(204);
            res.send(respuesta);
        } catch (error) {
            res.status(500).send("Error al eliminar el carrito");
        }
    
    }

    async deleteProductOfCart (req,res){
        let carritoId = req.params.cid;
        let productoId = req.params.pid;
        try {
            let respuesta = await CartServices.deleteProductOfCart(carritoId,productoId);
            if(respuesta){
                respuesta==="No se encuentra el producto"?res.status(404).send(respuesta):res.status(200).send(respuesta);
            } else {
                res.status(404).send("No se encuentra un carrito con ese ID")
            }
            
        } catch (error) {
            res.status(500).send("Error al eliminar el producto del carrito por id");
        }
    
    }



}

module.exports = new CartController();