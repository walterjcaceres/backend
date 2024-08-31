const mongoose = require('mongoose');

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

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;