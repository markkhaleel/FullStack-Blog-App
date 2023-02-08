const express = require('express');
const addPost = require('../controllers/addPostController');
const getPosts = require('../controllers/getPostsController');
const router = express.Router();

router.get('/', getPosts)
router.post('/', addPost)

module.exports = router;