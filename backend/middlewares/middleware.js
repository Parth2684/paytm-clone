require("dotenv").config({
    path: "../.env"
})
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.json({
            msg: "Authorization Error"
        })
    }
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded){
            req.userId = decoded.userId;
            next();
        }else{return res.status(403).json({
            msg: "Authorization error"
        })  
        }
        
       
    }catch(err){
        return res.status(403).json({
            msg: "Authorization error"
        })
    }
}



module.exports = {
    authMiddleware
}