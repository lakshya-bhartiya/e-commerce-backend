const userService = require("./service.user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userController = {};

userController.registerUser = async (req, res) => {
    const { name, email, password, mobile } = req.body;

    try {
        // Check if user already exists by email
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).send({
                status: false,
                msg: "Email already exists",
                data: null,
            });
        }

        // Check if user already exists by mobile
        const existingMobile = await userService.findUserByMobile(mobile);
        if (existingMobile) {
            return res.status(400).send({
                status: false,
                msg: "Mobile already exists",
                data: null,
            });
        }

        // Register user
        const newUser = await userService.registerUser({ name, email, password, mobile });
        const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);

        return res.status(201).send({
            status: true,
            msg: "User registered successfully",
            data: { user: newUser, token },
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

userController.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(400).send({
                status: false,
                msg: "User not found",
                data: null,
            });
        }

        // Compare password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                status: false,
                msg: "Invalid credentials",
                data: null,
            });
        }

        // Generate token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        return res.status(200).send({
            status: true,
            msg: "User logged in successfully",
            data: { user, token },
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: "Something went wrong",
            error: error.message,
        });
    }
};

module.exports = userController;
