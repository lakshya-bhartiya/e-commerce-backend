const router = require('express').Router();
const userRouter = require("./user/route.user")
router.use("/user", userRouter)


module.exports = router;