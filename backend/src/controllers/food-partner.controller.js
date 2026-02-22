const foodPartnerModel = require('../models/foodpartner.model.js');
const foodModel = require('../models/food.model.js')


async function getFoodPartnerById(req, res){   
    
    try {
        const foodPartnerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(foodPartnerId)) {
            return res.status(400).json({
                message: "Invalid Food Partner ID"
            });
        }

    const [foodPartner, foodItemsByFoodPartner] = await Promise.all([
            foodPartnerModel.findById(foodPartnerId),
            foodModel.find({ foodPartner: foodPartnerId })
        ]);

    if(!foodPartner){
        return res.status(404).json({
            message: "Food Partner not found"
        });
    }

    res.status(200).json({
        message: "Food partner fetched successfully",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    });

        } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = {
    getFoodPartnerById
}
