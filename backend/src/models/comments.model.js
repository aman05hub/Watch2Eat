const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    }
},{
    timestamps:true
})

const Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;