const userRouter = require("./user")
const express = require("express")

const router = express.Router();

router.use("/user", userRouter)

module.exports = router;