const express = require('express');
const router = express.Router();
let usersController = require('../controllers/users');
const handleErrorAsync = require('../handle/handleErrorAsync');

usersController = new usersController();

router.post('/', handleErrorAsync(usersController.handleAddUser));

module.exports = router;
