const productModel = require("../models/productos.model.js")

class ProductManager {
   
    async addProduct({ title,description,code,price,stock,category,thumbnails }) {
        
        try {
            const existeProducto = await productModel.findOne({code:code})
            if(existeProducto){
                console.log("El producto es unico, ya existe un producto con ese codigo")
                return
            }
            const nuevoProducto = new productModel({
                title,
                description,
                code,
                price,
                stock,
                category,
                status:true,
                thumbnails: thumbnails || []
            })


            await nuevoProducto.save();

        } catch (error) {
            console.log("error al cargar un nuevo producto");
        }
    }

    async getProducts(limit,page,sort) {
        try {
            console.log(limit);
            console.log(page);
            console.log(sort);
            const arrayProductos = await productModel.paginate({},{limit,page,sort}); 
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer el archivo", error); 
        }

    }

    async getProductById(id) {
        try {
            const arrayProductos = await productModel.findById(id);
            return arrayProductos || null;
        } catch (error) {
            console.log("Error al buscar por id", error); 
        }
    }



    //Método para actualizar productos: 

    async updateProduct(id, productoActualizado) {
        try {
            const producto = await productModel.findByIdAndUpdate(id,productoActualizado); 

            if(producto){
                return("Producto actualizado"); 
            } else {
                return("No se encuentra el producto"); 
            }
        } catch (error) {
            console.log("Tenemos un error al actualizar productos",error); 
        }
    }

    async deleteProduct(id) {
        try {
            const producto = await productModel.findByIdAndDelete(id);

            
            if(producto){
                return("Producto eliminado");
            } else {
                return("Producto no encontrado")
            }   
              
        } catch (error) {
            console.log("Tenemos un error al eliminar productos",error); 
        }
    }
}

module.exports = ProductManager; 