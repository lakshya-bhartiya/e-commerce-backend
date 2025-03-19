const router = require('express').Router();
const userRouter = require("./user/route.user")
const productRouter = require("./product/product.route")
const categoryRouter = require("./category/category.routes")
const cartRouter = require("./cart/cart.route")
const orderRouter = require("./orders/orders.routes")

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/category", categoryRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)


module.exports = router;