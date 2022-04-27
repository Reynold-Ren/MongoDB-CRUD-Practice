const Posts = require('../models/posts');
var createError = require('http-errors');

module.exports = class PostsController {
	handleGetPosts = async (req, res) => {
		const allPosts = await Posts.find();
		res.json({
			status: 'Success',
			data: allPosts
		});
	}

	handleAddPost = async (req, res) => {
		try {
			let { name, content, image, tags, type, likes, comments } = req.body;
			image = image ? image : '';
			likes = likes ? likes : 0;
			comments = comments ? comments : 0;

			const newPost = await Posts.create({ name, content, image, tags, type, likes, comments });
			res.json({
				status: 'Success',
				data: newPost
			});
		} catch(error) {
			res.json({
				status: 'Failed',
				data: createError(400, error.message)
			});
		}
	}

	handleDeleteAllPosts = async (req, res) => {
		const deleteAllPostsResult = await Posts.deleteMany({});
		res.json({
			status: 'Success',
			data: {
				'deletedCount': deleteAllPostsResult.deletedCount
			}
		});
	}

	handleDeletePost = async (req, res) => {
		const { id } = req.params;
		
		try {
			const deleteSinglePostResult = await Posts.findByIdAndDelete(id);
			res.json({
				status: 'Success',
				data: {
					...deleteSinglePostResult
				}
			});
		}
		catch {
			res.json({
				status: 'Failed',
				data: {
					message: '查無此 ID'
				}
			});
		}
	}

	handleUpdatePost = async (req, res) => {
		const { id } = req.params;
		const data = req.body;

		if ( data.content )

		try {
			const updatePost = await Posts.findByIdAndUpdate(id, data, { runValidators: true, new: true });
			res.json({
				status: 'Success',
				data: updatePost
			});
		}
		catch(error) {
			res.json({
				status: 'Failed',
				data: createError(500, error.message)
			});
		}
	}
}