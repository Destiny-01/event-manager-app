const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post("/signup", AuthController.registerNewUser);
router.post("/login", AuthController.loginuser);

module.exports = router;
