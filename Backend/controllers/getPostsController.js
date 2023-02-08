const Post = require("../model/Post")

const getPosts = async (req, res) => {
    try {
        const userId = req.query.userId;

        const foundPost = await Post.find({ user: userId }).exec();
        console.log(foundPost)
        res.status(200).json(foundPost)
    } catch (error) {
        console.log(error)
    }




    // User
    //     .findOne({ _id: userId })
    //     .populate({
    //         path: "posts"
    //     })
    //     .then(user => {
    //         res.json(user);
    //     });
}

module.exports = getPosts;