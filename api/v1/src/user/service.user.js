const User = require("./model.user");
const bcrypt = require("bcrypt");

const userService = {};

userService.registerUser = async ({ name, email, password, mobile }) => {
    const hash = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ name, email, password: hash, mobile });
    return newUser;
};

userService.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

userService.findUserByMobile = async (mobile) => {
    return await User.findOne({ mobile });
};

module.exports = userService;
