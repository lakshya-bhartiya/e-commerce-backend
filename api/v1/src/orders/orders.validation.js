const Joi = require("joi");

const placeOrderSchema = Joi.object({
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).required()
        })
    ).required(),
    totalPrice: Joi.number().min(0).required()
});

const cancelOrderSchema = Joi.object({
    orderId: Joi.string().required()
});

module.exports = { placeOrderSchema, cancelOrderSchema };
