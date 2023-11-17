const express = require("express");
const router = express.Router();
const { loginController, signupController } = require("../controller/auth");
const {
  validateStudentRegistration,
} = require("../middlewares/validate-registration");
const validateLogin = require("../middlewares/validate-login");

router.route("/login").post(validateLogin, loginController);
router
  .route("/register/student")
  .post(validateStudentRegistration, signupController);

module.exports = router;
