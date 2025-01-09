const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = express.Router()
const { z } = require("zod")
const {User, Account} = require("../db/db")
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares/middleware");
const { JWT_SECRET } = require("../config");


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
            userId: newUser._id
        }, JWT_SECRET)
        await Account.create({
            userId: newUser._id,
            balance: 1 + Math.random() * 10000
        })
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
            userId: user._id
        }, JWT_SECRET)
        res.json({
            token
        })
        return;
    }
})

router.get("/info", authMiddleware, async (req, res) => {
    try {
        const userId  = req.userId

        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json({
                msg: "user not found"
            })
        }

        res.status(200).json(
            user
        )
        return
    } catch (error) {
        console.log("error", error)
        res.status(400).json({
            msg: "error while getting info"
        })
    }
})

const updateBody = z.object({
    username: z.string().email().optional(),
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {
    
    console.log("username", req.body)

    const user = await User.findByIdAndUpdate(req.userId, {
        username: req.body.username
    })
    res.json({
        msg: "Details Updated successfully",
        user
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