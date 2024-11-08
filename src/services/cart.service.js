const CartRepository = require('../repositories/cart.repository.js');
const ProductRepository = require('../repositories/product.repository.js')
// const ProductManager = require('../dao/db/product-manager-db.js');  // MODIFICAR ESTOOO!! Y LINEA 33
// const prodManager = new ProductManager();

class CartService {


    async addCart() {
        return await CartRepository.saveNew();
    }


    async getCarts() {
        return await CartRepository.find();
    }

    async getCartById(carritoId) {
        const carrito = await CartRepository.findById(carritoId);
        return carrito;
    }

    // async getAmount(carritoId){
    //     const carrito = await CartRepository.findById(carritoId);
    //     //console.log(carrito.products[0].product.price);
    //     const amount = carrito.products.reduce((acumulador, elemento) => acumulador + elemento.product.price*elemento.quantity, 0);
    //     return amount;
    // }


    async AddProductsToCart(carritoId, productoId, quantity) {
        const carrito = await CartRepository.findById(carritoId);
        if (carrito) {
            const existeProductoEnCarrito = carrito.products.find(p => p.product._id == productoId);
            if (existeProductoEnCarrito) {
                existeProductoEnCarrito.quantity += quantity;
            } else {
                const existeProducto = await ProductRepository.findById(productoId); 
                if (existeProducto) {
                    const arrayproductoId = [];
                    arrayproductoId.push(productoId);
                    carrito.products.push({ product: arrayproductoId, quantity });
                } else {
                    return null;
                }
            }
            carrito.markModified("products");
            const carritoActualizado = await CartRepository.findByIdAndUpdate(carritoId, carrito);
            return carritoActualizado;
        } else {
            console.log("No existe el carrito con ese ID")
            return null;
        }
    }

    async modifyProductsToCart(carritoId, productoId, quantity) {

        const carrito = await CartRepository.findById(carritoId);
        if (carrito) {
            const existeProducto = carrito.products.find(p => p.product._id == productoId);
            if (existeProducto) {
                existeProducto.quantity = quantity;
                carrito.markModified("products");
                const carritoActualizado = await CartRepository.findByIdAndUpdate(carritoId, carrito);
                return carritoActualizado;
            } else {
                return "No existe el producto a modificar";
            }
        } else {
            return "No existe el carrito con ese ID";
        }
    }

    async updateCartWithArray(carritoId, products) {
        const carrito = await CartRepository.findById(carritoId);

        if (carrito) {
            carrito.products = products;
            carrito.markModified("products");

            const carritoActualizado = await CartRepository.findByIdAndUpdate(carritoId, carrito);
            return carritoActualizado;

        } else {
            return "No existe el carrito con ese ID";
        }
    }


    async deleteCartById(carritoId) {
        let respuesta = await CartRepository.deleteById(carritoId);
        console.log(respuesta);
        if (respuesta) {
            return null;
        } else {
            return "No se encuentra un carrito con ese ID";
        }
    }

    async deleteProductOfCart(carritoId, productoId) {

        const carrito = await CartRepository.findById(carritoId)

        if (carrito) {

            const productoBuscado = carrito.products.findIndex(p => p.product._id == productoId);

            if (productoBuscado > -1) {
                carrito.products.splice(productoBuscado, 1);
                carrito.markModified("products");
                await CartRepository.findByIdAndUpdate(carritoId, carrito);
                return carrito;
            } else {
                return "No existe un producto con ese ID en este carrito";
            }

        } else {
            return "No existe el carrito con ese ID";
        }

    }
}

module.exports = new CartService();