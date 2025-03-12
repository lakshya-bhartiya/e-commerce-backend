const userModel = require("./model.user");
const userService = {};
const bcrypt = require("bcrypt");

userService.create = async (fullName, mobile, password) => {
  const hash = bcrypt.hashSync(password, 10);
  const register = await userModel.create({fullName, mobile, password: hash});
  return register;
};

userService.findMobile = async (mobile) => {
  const registeredMobile = await userModel.findOne({ mobile });
  return registeredMobile;
};

module.exports = userService;
