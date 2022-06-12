const express = require('express');
const router = express.Router();
let usersController = require('../controllers/users');

usersController = new usersController();

router.post('/', function (req, res, next) {
	usersController.handleAddUser(req, res);
});

module.exports = router;
