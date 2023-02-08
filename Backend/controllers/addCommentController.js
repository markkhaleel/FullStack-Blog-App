const Comment = require('../model/Comment');
const Post = require('../model/Post');
const User = require('../model/User');

const createComment = async (comment, username, postId) => {
    const foundUser = await User.findOne({ username }).exec()
    const foundPost = await Post.findOne({ _id: postId }).exec()

    const result = await Comment.create({
        user: foundUser._id,
        comment,
        post: postId
    })
    foundPost.comments.push(result._id)
    foundPost.save()

    console.log(result);
}

const addComment = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ "message": "Post ID, Author ID and comment are required" });
    }
    if (!req.params.postId) {
        return res.status(400).json({ "message": "Post ID is required" });
    }
    const { comment, username } = req.body;
    const postId = req.params.postId;
    console.log(req.body)
    createComment(comment, username, postId);
    res.status(200).json({ "message": 'success!' });
}

module.exports = addComment;