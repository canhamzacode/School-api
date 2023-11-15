const express = require("express");
const router = express.Router();
const { loginController, signupController } = require("../controller/auth");

router.route("/login").post(loginController);
router.route("/register/student").post(signupController);

module.exports = router;
