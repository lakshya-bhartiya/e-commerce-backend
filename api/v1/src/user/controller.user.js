const userService = require("./service.user");
const userController = {};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userController.create = async (req, res) => {
  try {
    const { fullName, mobile, password} = req.body;

    if (!fullName || !mobile || !password) {
      return res.send({
        status: false,
        message: "All fields are required",
        data: null,
      });
    }

    const registeredMobile = await userService.findMobile(mobile);

    if (registeredMobile) {
      return res.send({
        status: false,
        message: "Mobile already exists",
        data: null,
      });
    }

    const register = await userService.create(fullName, mobile, password);

    if (!register) {
      return res.send({
        status: false,
        message: "failed to register",
        data: null,
      });
    }
    return res.send({
      status: true,
      message: "user register successfully",
      data: register,
    });
  } catch (error) {
    console.error(error);
    return res.send({
      status: false,
      message: "something went wrong to create register",
      error,
    });
  }
};

userController.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.send({
        status: false,
        message: "All fields are required",
        data: null,
      });
    }

    const registeredMobile = await userService.findMobile(mobile);

    if (!registeredMobile) {
      return res.send({
        status: false,
        message: "user not found",
        data: null,
      });
    }

    const matchUserPassword = bcrypt.compareSync(
      password,
      registeredMobile.password
    );

    if (!matchUserPassword) {
      return res.send({
        status: false,
        message: "Password not match",
        data: null,
      });
    }

    var token = jwt.sign(
      { _id: registeredMobile._id },
      process.env.JWT_SECRET
    );

    return res.send({
      status: true,
      message: "User Login Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message: "something went wrong to login",
      error,
    });
  }
};

module.exports = userController;
