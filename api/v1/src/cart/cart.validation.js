const Joi = require("joi");

const addToCartSchema = Joi.object({
    productId: Joi.string().required().messages({
        "string.empty": "Product ID is required",
        "any.required": "Product ID is required",
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        "number.base": "Quantity must be a number",
        "number.integer": "Quantity must be an integer",
        "number.min": "Quantity must be at least 1",
        "any.required": "Quantity is required",
    }),
});

const updateCartSchema = Joi.object({
    productId: Joi.string().required().messages({
        "string.empty": "Product ID is required",
        "any.required": "Product ID is required",
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        "number.base": "Quantity must be a number",
        "number.integer": "Quantity must be an integer",
        "number.min": "Quantity must be at least 1",
        "any.required": "Quantity is required",
    }),
});

const removeCartSchema = Joi.object({
    productId: Joi.string().required().messages({
        "string.empty": "Product ID is required",
        "any.required": "Product ID is required",
    }),
});

module.exports = { addToCartSchema, updateCartSchema, removeCartSchema };
