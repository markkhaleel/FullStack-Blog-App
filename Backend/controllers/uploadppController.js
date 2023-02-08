const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const User = require('../model/User');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Profile Pictures",
        // public_id: (req, file) => req.body.username
    },
});
const upload = multer({ storage }).single("photo");

const updateDatabase = async (username, path) => {
    const foundUser = await User.findOne({ username }).exec();
    foundUser.profilePicture = path
    const result = await foundUser.save();
}

const handleUpload = (req, res) => {

    upload(req, res, (err) => {
        console.log('file:', req.file);
        console.log('body', req.body);
        if (!req.body || !req.file || err) {
            res.status(400).json({ "message": 'not success!' });
            console.log(err)
        } else {
            res.status(200).json({ "message": 'success!' });
            console.log(req.body.username)
            updateDatabase(req.body.username, req.file.path);
        }
    })

};

module.exports = handleUpload;

// https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675282057/Profile%20Pictures/Mark.jpg
// https://res.cloudinary.com/dhi4lq2xs/image/upload/v1675291483/Profile%20Pictures/lol.jpg
