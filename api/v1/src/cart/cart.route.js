const express = require("express");
const cartController = require("./cart.controller");
const validate = require("../../middleware/middleware.validation");
const { addToCartSchema, updateCartSchema, removeCartSchema } = require("./cart.validation");
const authMiddleware = require("../../middleware/authHelper");

const router = express.Router();

router.post("/add", authMiddleware, validate(addToCartSchema), cartController.addToCart);
router.get("/", authMiddleware, cartController.getCart);
router.put("/update", authMiddleware, validate(updateCartSchema), cartController.updateCartItem);
router.delete("/remove", authMiddleware, validate(removeCartSchema), cartController.removeCartItem);

module.exports = router;
