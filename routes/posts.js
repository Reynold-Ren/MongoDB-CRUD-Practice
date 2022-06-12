const express = require('express');
const router = express.Router();
let postsController = require('../controllers/posts');
const handleErrorAsync = require('../handle/handleErrorAsync');
const { isAuth } = require('../service/auth');

postsController = new postsController();

router.get('/', isAuth, handleErrorAsync(postsController.handleGetPosts));
router.post('/', isAuth, handleErrorAsync(postsController.handleAddPost));
router.delete('/', isAuth, handleErrorAsync(postsController.handleDeleteAllPosts));
router.delete('/:id', isAuth, handleErrorAsync(postsController.handleDeletePost));
router.patch('/:id', isAuth, handleErrorAsync(postsController.handleUpdatePost));

module.exports = router;
