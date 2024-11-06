const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller.js");

router.post("/register", UserController.registerUser);
 router.post("/login", UserController.loginUser);
 router.get("/:uid", UserController.getUser);

module.exports = router;