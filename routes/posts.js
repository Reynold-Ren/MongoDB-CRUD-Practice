const express = require('express');
const router = express.Router();
let postsController = require('../controllers/posts');
const handleErrorAsync = require('../handle/handleErrorAsync');

postsController = new postsController();

router.get('/', handleErrorAsync(postsController.handleGetPosts));
router.post('/', handleErrorAsync(postsController.handleAddPost));
router.delete('/', handleErrorAsync(postsController.handleDeleteAllPosts));
router.delete('/:id', handleErrorAsync(postsController.handleDeletePost));
router.patch('/:id', handleErrorAsync(postsController.handleUpdatePost));

module.exports = router;
