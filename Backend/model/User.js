const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    posts: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
     }],
    profilePicture: String,
    refreshToken: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);