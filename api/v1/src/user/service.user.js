const userModel = require("./model.user");
const userService = {};
const bcrypt = require("bcrypt");

userService.create = async (name, email, mobile, password) => {
  const hash = bcrypt.hashSync(password, 10);
  const register = await userModel.create({name, email, mobile, password: hash});
  return register;
};

userService.findEmail = async (email) => {
  const registeredEmail = await userModel.findOne({ email });
  return registeredEmail;
};

userService.findMobile = async (mobile) => {
  const registeredMobile = await userModel.findOne({ mobile });
  return registeredMobile;
};

userService.findSingleUser = async (id) => {
  const singleUser = await userModel.findById(id);
  return singleUser;
};

userService.findAllUsers = async () => {
  const allUsers = await userModel.find({ isDeleted: false });
  return allUsers;
};

userService.updateUser = async (id, name, email, mobile) => {
  const updateUser = await userModel.findByIdAndUpdate(id, { name, email, mobile }, { new: true });
  return updateUser;
};

userService.deleteUser = async (id) => {
  const deleteUser = await userModel.findByIdAndUpdate(id, { isDeleted: true },  { new: true });
  return deleteUser;
};

module.exports = userService;
