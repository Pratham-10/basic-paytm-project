const User = require("../models/User");
const Account = require("../models/account")
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

    const userId = user._id;
    await Account.create({
        userId,
        balance:1+Math.random()*5000
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

const updateBody = zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional(),
    email:zod.string().optional()
})

exports.userUpdate = async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Invalid input to update"
        })
    }
    const id = req.userId
    await User.findByIdAndUpdate(id,req.body)
    res.json({
        message:"Updated successfully"
    })
}

exports.searchUser = async(req,res)=>{
    const filter = req.query.filter || ""
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        }, {
            lastName:{
                "$regex":filter
            }
        }]
    })
    res.json({
        users:users.map((user)=>({
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            id:user._id
        }))
    })
}