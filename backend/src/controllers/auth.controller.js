const userModel = require("../models/user.model");
const foodpartnerModel = require("../models/foodpartner.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    const {username,fullname,email,password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    const isUsernameAlreadyExists = await userModel.findOne({
        username
    })

    if(isUsernameAlreadyExists){
        return res.status(400).json({
            message: "Username already exists"
        })
    }

    const isEmailAlreadyExists = await userModel.findOne({
        email
    })

    if(isEmailAlreadyExists){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,
        fullname,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRECT)
    res.cookie("token",token)
    res.status(201).json({
        message:"User Registered Successfully ",
        user:{
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname
        }
    })
}

async function loginUser(req,res){
    const {username,password} = req.body;

    const user = await userModel.findOne({
        username
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid username or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid username or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRECT)

    res.cookie("token",token)

    res.status(200).json({
        message:"User Logged in successfully",
        user:{
            _id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname
        }
    })
}

async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logged out successfully"
    });
}

async function registerFoodPartner(req,res){
    const {name,contactName,phone,address,email,password} = req.body;

    const isFoodPartnerAlreadyExists = await foodpartnerModel.findOne({
        email
    })

    if (isFoodPartnerAlreadyExists){
        return res.status(400).json({
            message: "Food Partner already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const foodpartner = await foodpartnerModel.create({
        name,
        email,
        password:hashedPassword,
        contactName,
        phone,
        address
    })

    const token = jwt.sign({
        id: foodpartner._id,
    }, process.env.JWT_SECRECT)

    res.cookie("token",token)

    res.status(201).json({
        message: "Food Partner Registered Successfully ",
        foodpartner:{
            _id: foodpartner._id,
            email: foodpartner.email,
            name: foodpartner.name,
            contactName: foodpartner.contactName,
            phone: foodpartner.phone,
            address: foodpartner.address
        }
    })
}

async function loginFoodPartner(req,res){
    
    const {email,password} = req.body;

    const foodPartner = await foodpartnerModel.findOne({
        email
    })

    if(!foodPartner){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,foodPartner.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invaiid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    },process.env.JWT_SECRECT)

    res.cookie("token",token)

    res.status(200).json({
        message: "Food Partner logged in successfully",
        foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}