const ProductDao = require('../dao/product.dao.js');

class ProductRepository {

    
    async Paginate(filtro, limit, page, sort ){
        return await ProductDao.Paginate(filtro, limit, page, sort )
    }
    
    async findById(id) {
        return await ProductDao.findById(id);
    }

    async findOne(parametro){
        return await ProductDao.findOne(parametro);
    }

    async saveNew(product){
        return await ProductDao.saveNew(product);
    }

    async findByIdAndUpdate(id,productoActualizado){
        return await ProductDao.findByIdAndUpdate(id,productoActualizado);
    }

    async findByIdAndDelete(id){
        return await ProductDao.findByIdAndDelete(id);
    }


}

module.exports = new ProductRepository();