const express = require('express');
const router = express.Router();
const handleErrorAsync = require('../handle/handleErrorAsync');
let UploadController = require('../controllers/upload');
const upload = require('../service/upload');
const { isAuth } = require('../service/auth');

UploadController = new UploadController();

router.post('/', isAuth, upload, handleErrorAsync(UploadController.upload));

module.exports = router;
