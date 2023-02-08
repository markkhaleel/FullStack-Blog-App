const express = require('express')
const router = express.Router();
const verifyEmail = require('../controllers/verificationController');

router.post('/', verifyEmail)

module.exports = router;