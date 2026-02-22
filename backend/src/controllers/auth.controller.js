const userModel = require("../models/user.model");
const foodpartnerModel = require("../models/foodpartner.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    const username = req.body.username?.toLowerCase().trim();
    const fullname = req.body.fullname?.trim();
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;

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
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRECT);

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,          // ALWAYS true on Render (HTTPS)
    sameSite: "none",      // REQUIRED for cross-site
    path: "/",
});

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
    const username = req.body.username?.toLowerCase().trim();
    const password = req.body.password;

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

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRECT,
        {expiresIn: "7d"}
    );

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,          // ALWAYS true on Render (HTTPS)
    sameSite: "none",      // REQUIRED for cross-site
    path: "/",
    });

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
    res.clearCookie("token",{
        httpOnly: true,
        secure:false,
        sameSite: "none"
    });
    res.status(200).json({
        message:"User Logged out successfully"
    });
}

async function registerFoodPartner(req,res){

    const name = req.body.name?.trim();
    const contactName = req.body.contactName?.trim();
    const phone = req.body.phone?.trim();
    const address = req.body.address?.trim();
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;

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

    const token = jwt.sign(
        {id: foodpartner._id}, 
        process.env.JWT_SECRECT,
        {expiresIn: "7d"}
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });

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
    
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password;

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

    const token = jwt.sign(
    {id: foodPartner._id},
    process.env.JWT_SECRECT, 
    {expiresIn: "7d"}
);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });

    res.status(200).json({
        message: "Food Partner logged in successfully",
        foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

function logoutFoodPartner(req, res) {

    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });

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
