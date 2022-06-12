var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts');

postsController = new postsController();

router.get('/', function (req, res, next) {
	postsController.handleGetPosts(req, res);
});

router.post('/', function (req, res, next) {
	postsController.handleAddPost(req, res);
});

router.delete('/', function (req, res) {
	postsController.handleDeleteAllPosts(req, res);
});

router.delete('/:id', function (req, res) {
	postsController.handleDeletePost(req, res);
});

router.patch('/:id', function (req, res, next) {
	postsController.handleUpdatePost(req, res);
});

module.exports = router;
