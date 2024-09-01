const productModel = require("../models/productos.model.js")

class ProductManager {
   
    async addProduct({ title,description,code,price,stock,category,thumbnails }) {
        
        try {
            const existeProducto = await productModel.findOne({code:code})
            if(existeProducto){
                console.log("El producto es unico, ya existe un producto con ese codigo")
                return "El producto es unico, ya existe un producto con ese codigo";
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
            return nuevoProducto;

        } catch (error) {
            console.log("error al cargar un nuevo producto");
        }
    }

    async getProducts(limit,page,sort,query) {
        try {
            console.log(limit);
            console.log(page);
            console.log(sort);
            const filtro = query?{category:query}:{};
            const arrayProductos = await productModel.paginate(filtro,{limit,page,sort}); 
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
            const existeProducto = await productModel.findOne({code:productoActualizado.code})
            if(existeProducto){
                if(existeProducto.id!==id){
                return "El producto es unico, ya existe un producto con ese codigo";
                }
            }

            const producto = await productModel.findByIdAndUpdate(id,productoActualizado); 
            return producto;
        } catch (error) {
            console.log("Tenemos un error al actualizar productos",error); 
        }
    }

    async deleteProduct(id) {
        try {
            const producto = await productModel.findByIdAndDelete(id);
           return producto;
              
        } catch (error) {
            console.log("Tenemos un error al eliminar productos",error); 
        }
    }
}

module.exports = ProductManager; 