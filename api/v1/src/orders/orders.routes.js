const express = require("express");
const orderController = require("./orders.controller");
const validate = require("../../middleware/middleware.validation");
const { placeOrderSchema, cancelOrderSchema } = require("./orders.validation");
const authMiddleware = require("../../middleware/authHelper")

const router = express.Router();

router.post("/place", authMiddleware, validate(placeOrderSchema), orderController.placeOrder);
router.get("/:orderId", authMiddleware, orderController.getOrderById);
router.get("/", authMiddleware, orderController.getOrdersByUser);
router.put("/cancel", authMiddleware, validate(cancelOrderSchema), orderController.cancelOrder);

module.exports = router;
