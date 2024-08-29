const fs = require("fs").promises;


class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
        this.cargarArchivo();

    }

    async addProduct({ title,description,code,price,stock,category,thumbnails }) {
        
        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails
        }
        
        this.products.push(nuevoProducto);

        await this.guardarArchivo(this.products);
    }

    async getProducts() {
        try {
            const arrayProductos = await this.leerArchivo(); 
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer el archivo", error); 
        }

    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(producto => producto.id === id); 

            return buscado || null;
        } catch (error) {
            console.log("Error al buscar por id", error); 
        }
    }



    //Método para actualizar productos: 

    async updateProduct(id, productoActualizado) {
        try {
            const productos = await this.leerArchivo(); 

            let productoBuscado = productos.findIndex( producto => producto.id === id);
             if(productoBuscado>-1){
            productos[productoBuscado]={id:id,...productoActualizado};

                await this.guardarArchivo(productos); 
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
            const productos = await this.leerArchivo();

            let productoBuscado = productos.findIndex( producto => producto.id === parseInt(id));
            if(productoBuscado>-1){
                productos.splice(productoBuscado,1);
                await this.guardarArchivo(productos);
                return("Producto eliminado");
            } else {
                return("Producto no encontrado")
            }   
              
        } catch (error) {
            console.log("Tenemos un error al eliminar productos",error); 
        }
    }
    

        //Métodos auxiliares: 
        async cargarArchivo() {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            this.products=arrayProductos;

            if(this.products.length>0){
                ProductManager.ultId=Math.max(...this.products.map(product=>product.id))
            }
        }



        async leerArchivo() {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        }
    
        async guardarArchivo(arrayProductos) {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        }

}

module.exports = ProductManager; 