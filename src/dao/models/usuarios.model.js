const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({

    first_name:String,
    last_name:String,
    email:{
        type:String,
        required:true,
        unique: true
    },
    age:Number,
    password:String,
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required:true
        },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }

})

const UsuarioModel = mongoose.model("usuarios",usuarioSchema);

module.exports = UsuarioModel;
