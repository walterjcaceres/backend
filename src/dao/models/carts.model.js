const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cartSchema = new mongoose.Schema({
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required:true
                },
            quantity:{
                type:Number,
                required:true
                }
        }
    ]
})

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;