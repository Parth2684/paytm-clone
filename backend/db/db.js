require("dotenv").config({
    path: "../.env"
})

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6    
    },
    firstName: {
        type: String,
        required: true
    }
    lastName: {
        type: String,
        required: true
    }
})


const User = mongoose.model("User", userSchema);

module.exports = {
    User
}