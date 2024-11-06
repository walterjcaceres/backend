const ProductServices = require('../services/product.service.js');

class ProductController {

    async getProducts(req, res) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        let sort = req.query.sort || null;
        const query = req.query.query || null;
        let objetosort;
        if (sort === "asc") {
            objetosort = {
                price: 1
            }
        }
        if (sort === "desc") {
            objetosort = {
                price: -1
            }
        }

        try {
            
            const arrayProductos = await ProductServices.getProducts(limit, page, objetosort, query);
            const respuesta = {
                status: "success",
                payload: arrayProductos.docs,
                totalDocs: arrayProductos.totalDocs,
                limit: arrayProductos.limit,
                totalPages: arrayProductos.totalPages,
                page: arrayProductos.page,
                pagingCounter: arrayProductos.pagingCounter,
                hasPrevPage: arrayProductos.hasPrevPage,
                hasNextPage: arrayProductos.hasNextPage,
                prevPage: arrayProductos.prevPage,
                nextPage: arrayProductos.nextPage
            }
            res.status(200).send(respuesta);
        } catch (error) {
            res.status(500).send({ status: "Error al mostrar los productos" })
        }
    }


    async getProductById (req, res) {
        let pid = req.params.pid; 
        try {
            const producto = await ProductServices.getProductById(pid); 
            if(!producto) {
                res.status(404).send("Producto no encontrado"); 
            } else {
                res.status(200).send(producto); 
            }
        } catch (error) {
            res.status(500).send("Error al buscar ese id en los productos"); 
        }
    }


    async addProduct(req,res){
        let producto = req.body;
        try {
            
            if (!producto.title || !producto.description || !producto.price || !producto.code || !producto.stock || !producto.code ||!producto.category) {
                res.status(400).send("Todos los campos son obligatorios");
    
            } else {
                    const productoAñadido = await ProductServices.addProduct(producto); 
                    productoAñadido==="El producto es unico, ya existe un producto con ese codigo"?res.status(409).send(productoAñadido):res.status(201).send(productoAñadido);
                }
        } catch (error) {
            res.status(500).send("Error del servidor");
        }
    }

    async updateProduct(req,res){
        let pid = req.params.pid;
        let product = req.body;
        try {
            if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.code ||!product.category) {
                res.status(400).send("Todos los campos son obligatorios");
            } else {
                let respuesta = await ProductServices.updateProduct(pid,product);
               if(respuesta){
                    respuesta==="El producto es unico, ya existe un producto con ese codigo"?res.status(409).send(respuesta):res.status(201).send("Actualizado correctamente");
                } else {
                    res.status(404).send("Producto no encontrado");
                }
            }
        } catch (error) {
            res.status(500).send("Error del servidor");
        }
    }

    async deleteProduct(req,res){
        let pid = req.params.pid;
        try {
            let respuesta = await ProductServices.deleteProduct(pid); 
            if(respuesta){
                res.status(204).send("Eliminado correctamente");
            } else {
                res.status(404).send("Producto no encontrado");
            }
           
        } catch (error) {
            res.status(500).send("Error del servidor")
        }
    
    }
}

module.exports = new ProductController();