const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = express.Router()
const { z } = require("zod")
const User = require("../db/db")
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/Middleware");
const JWT_SECRET = process.env.JWT_SECRET;

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
}) 

router.post("/signup", async (req, res) => {
    const body = req.body;
    const {success} = signupBody.safeParse(body);
    if(!success){
        return res.json({
            msg:"invalid input"
        })
    }

    const user = await User.findOne({
        username: body.username
    })
    if(user){
        res.json({
            msg: "email already taken"
        })
    }else{
        const newUser = await User.create(body);
        const token = jwt.sign({
            userID: newUser._id
        }, JWT_SECRET)
        res.json({
            msg: "User created successfully",
            token: token
        })
    }
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if(!success){
        return res.json({
            msg: "invalid inputs"
        })
    }
    
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username,
        password: password
    })
    if(!user){
        return res.json({
            msg: "Invalid Email or Password"
        })
    }else{
        const token = jwt.sign({
            userID: user._id
        }, JWT_SECRET)
        res.json({
            token
        })
        return;
    }
})

const updateBody = z.object({
    username: z.string().email().optional(),
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        res.status(403).json({
            msg: "Invalid inputs"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })
    res.json({
        msg: "Details Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router