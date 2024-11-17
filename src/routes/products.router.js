const express = require("express"); 
const router = express.Router(); 
const ProductManager = require("../dao/db/product-manager-db"); 
const manager = new ProductManager();
const ProductController = require("../controllers/product.controller.js");


router.get("/", ProductController.getProducts);
router.get("/:pid", ProductController.getProductById);
router.post("/", ProductController.addProduct);
router.put("/:pid", ProductController.updateProduct);
router.delete("/:pid", ProductController.deleteProduct);

module.exports = router; 

