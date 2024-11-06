const TicketRepository = require('../repositories/ticket.repository.js');
const CartService = require('./cart.service.js');

class TicketServices {

    async Purchase(cartId,email){
        let code="0";
        const cart=await CartService.getCartById(cartId);
        const total=await CartService.getAmount(cartId);
        console.log(total)
        const lastTicket = await TicketRepository.getLastTicket();
        if(lastTicket){code=parseInt(lastTicket.code)+1};
        const ticket=await TicketRepository.saveNew(code,total,email);
        return ticket

    }


}

module.exports = new TicketServices();