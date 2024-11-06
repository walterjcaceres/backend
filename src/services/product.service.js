const ProductRepository = require('../repositories/product.repository.js');

class ProductService {
    async getProducts(limit, page, sort, query) {

        const filtro = query ? { category: query } : {};
        const arrayProductos = await ProductRepository.Paginate(filtro, limit, page, sort );
        return arrayProductos;

    }

    async getProductById(id){
        const arrayProductos = await ProductRepository.findById(id);
        return arrayProductos
    }

    async addProduct(product){
        console.log("1")
        const existeProducto = await ProductRepository.findOne({code:product.code})
        console.log("2")
        if(existeProducto){
            return "El producto es unico, ya existe un producto con ese codigo";
        }
        const nuevoProducto = await ProductRepository.saveNew({
            title:product.title,
            description:product.description,
            code:product.code,
            price:product.price,
            stock:product.stock,
            category:product.category,
            status:true,
            thumbnails:product.thumbnails || []
        })

        return nuevoProducto;
    }

    async updateProduct(id, product) {
        try {
            const existeProducto = await ProductRepository.findOne({code:product.code})
            if(existeProducto){
                if(existeProducto.id!==id){
                return "El producto es unico, ya existe un producto con ese codigo";
                }
            }

            const producto = await ProductRepository.findByIdAndUpdate(id,product); 
            return producto;
        } catch (error) {
            console.log("Tenemos un error al actualizar productos",error); 
        }
    }

    async deleteProduct(id){
        return await ProductRepository.findByIdAndDelete(id);
    }


}

module.exports = new ProductService();