const User = require("../models/User");
const dotenv = require('dotenv').config({path : '../.env'});
const jwt = require("jsonwebtoken")
const jwtPasskey = process.env.JWT_PASSKEY

const authMiddleware = (req,res,next)=>{
    try {
        const validator = req.headers.authorization.split(" ")
        const token = validator[1];
        try {
            const decoded = jwt.verify(token,jwtPasskey);
            req.userId = decoded.userId
            next()
        } catch (error) {
            console.log(error);
        res.status(403).json({
            "message":"You are not authorized as a user.Please signup or sign in to your account"
        })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            "message":"Token not found"
        }) 
    }
}

module.exports = authMiddleware