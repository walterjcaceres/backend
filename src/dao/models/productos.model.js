const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

//Definimos el schema:
const productoSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description:  {
        type:String,
        required:true
    },
    code:  {
        type:String,
        required:true,
        unique:true
    },
    price:  {
        type:Number,
        required:true
    },
    stock:  {
        type:Number,
        required:true
    },
    category:  {
        type:String,
        required:true
    },
    status: {
        type:Boolean,
        required:true
    },
    thumbnails: [String] 
})

//definimos el model:

productoSchema.plugin(mongoosePaginate);
const productModel = mongoose.model("products",productoSchema);

module.exports = productModel;
