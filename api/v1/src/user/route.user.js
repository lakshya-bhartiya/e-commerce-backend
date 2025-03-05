const router = require("express").Router();
const userController = require("./controller.user");
const validate = require("../../middleware/middleware.validation")
const loginValidation = require("./validation.userLogin")
const registerValidation = require("./validation.userRegister")
router.post("/create", validate(registerValidation), userController.create);
router.post("/login", validate(loginValidation), userController.login);
router.get("/getUserById/:id", userController.findSingleUser)
router.get("/allUsers", userController.findAllUsers);
router.patch("/updateUserById/:id", userController.updateUser);
router.delete("/deleteUserById/:id", userController.deleteUser);

module.exports = router;
