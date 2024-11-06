const TicketDao = require('../dao/ticket.dao.js');

class TicketRepository {

    async saveNew(code,total,email) {
        return await TicketDao.saveNew(code,total,email);
    }

    async find(){
        return await TicketDao.find();
    }

    async findById(id){
        return await TicketDao.findById(id);
    }

    async getLastTicket() {
        const lastTicket = await TicketDao.getLastTicket(); 
        return lastTicket;
    }

    async findByIdAndUpdate(id,array){
        return awaitTickettDao.findByIdAndUpdate(id,array);
    }

    async deleteById(id){
        return await TicketDao.deleteById(id);
    }
}

module.exports = new TicketRepository();