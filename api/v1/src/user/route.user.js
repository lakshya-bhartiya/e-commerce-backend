const express = require("express");
const userController = require("./controller.user");
const validate = require("../../middleware/middleware.validation");
const registerValidationSchema = require("./validation.userRegister")
const loginValidationSchema = require("./validation.userLogin");

const router = express.Router();

router.post("/register", validate(registerValidationSchema), userController.registerUser);
router.post("/login", validate(loginValidationSchema), userController.loginUser);

module.exports = router;
