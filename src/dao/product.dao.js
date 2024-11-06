const productModel = require('./models/productos.model.js');

class ProductDao{

    async Paginate(filtro, limit, page, sort ){
        return await productModel.paginate(filtro, { limit, page, sort })
    }

    async findById(id) {
        return await productModel.findById(id);
    }

    async findOne(parametro){
        return await productModel.findOne(parametro);
    }

    async saveNew(product){
        const newProduct = new productModel(product);
        await newProduct.save();
        return newProduct;
    
    }

    async findByIdAndUpdate(id,productoActualizado){
        return await productModel.findByIdAndUpdate(id,productoActualizado);
    }

    async findByIdAndDelete(id){
        return await productModel.findByIdAndDelete(id);
    }
    
}

module.exports = new ProductDao();
