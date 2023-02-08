const express = require('express');
const handleUpload = require('../controllers/UploadPPController');
const router = express.Router();

router.post('/', handleUpload)

module.exports = router;