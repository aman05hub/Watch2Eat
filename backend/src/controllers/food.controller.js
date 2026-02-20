const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const LikeModel = require('../models/likes.model');
const SaveModel = require('../models/save.model');
const CommentModel = require('../models/comments.model');
const {v4:uuid} = require('uuid')


async function createFood(req,res){

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })
    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food Item fetch successfully",
        foodItems
    })
}

async function likeFood(req, res) {
    const { foodId} = req.body;
    const user = req.user;

    const AlreadyLiked = await LikeModel.findOne({
        user: user._id,
        food: foodId
    })
    
    if(AlreadyLiked){
        await LikeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc: {likeCount: -1}
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await LikeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1}
    })

    res.status(201).json({
        message: "Food Liked successfullly",like
    })
}

async function saveFood(req, res) {
    const { foodId} = req.body;
    const user = req.user;

    const isAlreadySaved = await SaveModel.findOne({
        user: user._id,
        food: foodId
    })

    if(isAlreadySaved){
        await SaveModel.deleteOne({
            user: req.user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc: { savesCount: -1}
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await SaveModel.create({
        user: req.user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1}
    })

    res.status(201).json({
        message: "Food saved successfully",save
    })
}

async function getSavedFoods(req, res) {
    const user = req.user;

    const savedFoods = await SaveModel.find({ user: user._id }).populate('food');

    if(!savedFoods || savedFoods.length === 0) {
        return res.status(200).json({
            message: "No saved foods found"
        })
    }

    res.status(200).json({
        message: "Saved foods fetched successfully",
        savedFoods
    });
}

async function commentOnFood(req, res) {
    try {
        const user = req.user;
        const { foodId, comment } = req.body;

        if (!foodId || !comment) {
            return res.status(400).json({
                message: "foodId and comment are required"
            });
        }

        const newComment = await CommentModel.create({
            user: user._id,
            food: foodId,
            text: comment,
            username: user.username
        })
        
        const populated = await newComment.populate('user', 'username');

        res.status(201).json({
            message: "Comment added successfully",
            comment: populated
        })
    } catch (err) {
        res.status(500).json({
            message: "Error adding comment",
            error: err.message
        })
    }
}

async function getFoodComments(req, res){
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Food ID is required"
            });
        }

        const comments = await CommentModel.find({ food: id }).populate('user', 'username');

        res.status(200).json({
            message: "Comments fetched successfully",
            comments
        })
    } catch (err) {
        res.status(500).json({
            message: "Error fetching comments",
            error: err.message
        })
    }
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFoods,
    commentOnFood,
    getFoodComments
}