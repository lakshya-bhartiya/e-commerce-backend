const Joi = require("joi");

const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
});

module.exports = registerValidationSchema;
