const TicketRepository = require('../repositories/ticket.repository.js');
const CartService = require('./cart.service.js');
const ProductService = require('./product.service.js')

class TicketServices {

    async Purchase(cartId, email) {
        let code = "0";
        let amount = 0;
        let productosSinStock = [];
        let stock = false;
        const cart = await CartService.getCartById(cartId);  //obtengo carrito del user

        for (let i = 0; i < cart.products.length; i++) {                       //recorro todos los elementos del carrito
            let product = await ProductService.getProductById(cart.products[i].product._id); //busco el producto por ID en la base de datos de productos
            if (cart.products[i].quantity <= product.stock) {  //chequeo si el cliente compra menos productos de los que hay en stock

                product.stock = product.stock - cart.products[i].quantity;  //actualizo stock //hay stock

                await ProductService.updateProduct(product.id, product); //actualizo la base de datos de productos con el stock
                amount = amount + cart.products[i].product.price*cart.products[i].quantity;
                await CartService.deleteProductOfCart(cartId, product.id) //elimino el producto del carrito ya que se proceso

                stock = true;
            } else {
                console.log("tiene mas productos")       //no hay stock
                productosSinStock.push(cart.products[i]);
            }
        }

        if (stock) {
            //const total = await CartService.getAmount(cartId);   //obtengo el total de la compra
            const lastTicket = await TicketRepository.getLastTicket(); //obtengo el ultimo ticket generado para despues incrementar en 1 el code
            if (lastTicket) { code = parseInt(lastTicket.code) + 1 };  //incremento el code +1
            const ticket = await TicketRepository.saveNew(code, amount, email);
            return { ticket: ticket, sinStock: productosSinStock }
        } else {

            return { ticket: null, sinStock: productosSinStock }
        }

    }


}

module.exports = new TicketServices();