const Joi = require("joi");
const mongoose = require("mongoose");

const productValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Product name is required",
        "any.required": "Product name is required",
    }),
    price: Joi.number().positive().required().messages({
        "number.base": "Price must be a number",
        "number.positive": "Price must be greater than zero",
        "any.required": "Price is required",
    }),
    category: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message("Invalid category ID");
            }
            return value;
        })
        .required()
        .messages({
            "string.empty": "Category ID is required",
            "any.required": "Category ID is required",
        }),
    stock: Joi.number().integer().min(0).required().messages({
        "number.base": "Stock must be a number",
        "number.min": "Stock cannot be negative",
        "any.required": "Stock is required",
    }),
    description: Joi.string().optional().allow(""),
});

module.exports = { productValidationSchema };
