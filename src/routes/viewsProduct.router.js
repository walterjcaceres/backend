const express = require("express");
const router = express.Router();
const passport = require("passport");
const {soloAdmin, soloUser} = require('../middleware/auth.js');

const viewsProductController = require ('../controllers/viewsProduct.controller.js');

router.get("/",passport.authenticate("current",{session:false}),soloUser,viewsProductController.getProducts);
router.get("/realTimeProducts",passport.authenticate("current",{session:false}),soloAdmin,viewsProductController.getRealTime);

module.exports = router; 