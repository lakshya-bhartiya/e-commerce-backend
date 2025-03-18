const router = require('express').Router();
const userRouter = require("./user/route.user")
const productRouter = require("./product/product.route")
const categoryRouter = require("./category/category.routes")
const cartRouter = require("./cart/cart.route")

router.use("/user", userRouter)
router.use("/product", productRouter)
router.use("/category", categoryRouter)
router.use("/cart", cartRouter)


module.exports = router;