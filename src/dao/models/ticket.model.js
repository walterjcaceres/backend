const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    
            code:{
                    type:String,
                    unique:true, //aungenerado
                    required:true
                },
            purchase_datetime: {
                type:Date,
                required:true
                },
            amount: Number, //total de la compra.
            purchaser: String //contendrá el correo del usuario asociado al carrito.

   
})

const ticketModel = mongoose.model("tickets", ticketSchema);

module.exports = ticketModel;