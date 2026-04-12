const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

//user auth APIs
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)

// food partner auth APIs
router.post('/food-partner/register',authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.get('/food-partner/logout',authController.logoutFoodPartner)

router.get('/me', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(200).json({ user: null });

    try {
        const jwt = require('jsonwebtoken');
        const userModel = require('../models/user.model');
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);
        const user = await userModel.findById(decoded.id).select('username email');
        return res.status(200).json({ user: user || null });
    } catch {
        return res.status(200).json({ user: null });
    }
});
module.exports = router;