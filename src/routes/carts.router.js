
const express = require("express"); 
const router = express.Router(); 
const CartController = require("../controllers/cart.controller.js");
const TicketController = require("../controllers/ticket.controller.js");

 
router.get("/", CartController.getCarts);
router.get("/:cid", CartController.getCartById);
router.post("/:cid/purchase", TicketController.Purchase);
router.post("/", CartController.createCart);
router.post("/:cid/product/:pid", CartController.AddProductsToCart);
router.put("/:cid/product/:pid", CartController.modifyProductsToCart);
router.put("/:cid", CartController.updateCartWithArray);
router.delete("/:cid", CartController.deleteCartById);
router.delete("/:cid/product/:pid", CartController.deleteProductOfCart);


module.exports = router; 


