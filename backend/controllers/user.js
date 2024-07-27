const {User} = require("../models/User");
const zod = require('zod')
const dotenv = require('dotenv').config({path : '../.env'});
const jwt = require("jsonwebtoken")
const jwtPasskey = process.env.JWT_PASSKEY

const signupBody = zod.object({
    email:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})
exports.userSignup = async(req,res)=>{
    console.log(req.body);
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Incorrect input"
        })
    }
    const isUserExist = await User.findOne({email:req.body.email})
    if(isUserExist){
        return res.status(411).json({
            message:"Email already exist"
        })
    }
    const user = await User.create({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })
    return res.status(200).json({
        message:"User registered successfully"
    })
}

const loginBody = zod.object({
    email:zod.string().email(),
    password:zod.string()
})

exports.userLogin = async(req,res)=>{
    const {success} = loginBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Enter valid email or password"
        })
    }
    const isUserExist = await User.findOne({email:req.body.email})
    if(!isUserExist){
        return res.status(403).json({
            message:"User doesn't exist.Please signup first and then login"
        })
    }
    const userId = isUserExist._id
    const token  = jwt.sign({userId},jwtPasskey)
    return res.status(200).json({
        message:"User logged in successfully",
        token:token
    }) 
}
