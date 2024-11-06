const CartDao = require('../dao/cart.dao.js');

class CartRepository {

    async saveNew() {
        return await CartDao.saveNew();
    }

    async find(){
        return await CartDao.find();
    }

    async findById(id){
        return await CartDao.findById(id);
    }

    async findByIdAndUpdate(id,array){
        return await CartDao.findByIdAndUpdate(id,array);
    }

    async deleteById(id){
        return await CartDao.deleteById(id);
    }
}

module.exports = new CartRepository();