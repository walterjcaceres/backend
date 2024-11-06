const ticketModel = require('./models/ticket.model.js');

class TicketDao{
    async saveNew(code,total,email){  
        console.log(email);
        const nuevoTicket = new ticketModel({
            code:code,
            purchase_datetime:new Date().toISOString(),
            amount:total,
            purchaser:email
        });
        await nuevoTicket.save(); 
        return nuevoTicket;    
    }

    async find(){
        const tickets = await ticketModel.find();
        return tickets;  
    }

    async findById(id){
        const ticket = await ticketModel.findById(id);
        return ticket; 
    }

    async getLastTicket() {
        const lastTicket = await ticketModel.findOne().sort({ purchase_datetime: -1 }); 
        return lastTicket;
    }

    async findByIdAndUpdate(id,array){
        const ticket = await ticketModel.findByIdAndUpdate(id,array,{ new: true });
        return ticket;
    }

    async deleteById(id){
        const ticket = await ticketModel.findByIdAndDelete(id);
        return ticket;
    }
}

module.exports = new TicketDao();

