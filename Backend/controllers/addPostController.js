const Post = require('../model/Post');
const User = require('../model/User');
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Posts Images",
        // public_id: (req, file) => req.body.username
    },
});

const upload = multer({ storage }).single("photo");

const createPost = async (username, title, description, path) => {
    const foundUser = await User.findOne({ username }).exec();
    console.log(username)
    const result = await Post.create({
        user: foundUser._id,
        title,
        description,
        photo: path
    })
    foundUser.posts.push(result._id)
    foundUser.save()
    console.log(result);
}

const addPost = (req, res) => {
    upload(req, res, (err) => {
        console.log('file:', req.file);
        console.log('body', req.body);
        if (!req.body || !req.file || err) {
            res.status(400).json({ "message": "title and description are required" });
            console.log(err)
        } else {
            const { title, description, username } = req.body;
            createPost(username, title, description, req.file.path);
            res.status(200).json({ "message": 'success!' });
        }
    })

}

module.exports = addPost;