const express = require('express');
const router = express.Router();
let usersController = require('../controllers/users');
const handleErrorAsync = require('../handle/handleErrorAsync');
const { isAuth } = require('../service/auth');

usersController = new usersController();

router.post('/sign_up', handleErrorAsync(usersController.signUp));
router.post('/sign_in', handleErrorAsync(usersController.signIn));
router.get('/profile/', isAuth, handleErrorAsync(usersController.getProfile));
router.post('/updatePassword', isAuth, handleErrorAsync(usersController.updatePassword));
router.patch('/profile', isAuth, handleErrorAsync(usersController.updateProfile));

module.exports = router;
