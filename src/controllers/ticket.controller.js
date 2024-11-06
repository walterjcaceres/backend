const TicketServices = require('../services/ticket.service.js');


class TicketController{
    async Purchase(req,res){
        const cartId=req.params.cid;
        const email=req.body.purchaser;
        try {
            const ticket=await TicketServices.Purchase(cartId,email);
            res.status(200).send(ticket);          
        } catch (error) {
            res.status(500).send("Error al emitir el ticket de la compra");
        }
    }

}


module.exports = new TicketController();