const Posts = require('../models/posts');
const handleError = require('../handle/handleError');
const handleSuccess = require('../handle/handleSuccess');

module.exports = class PostsController {
	handleGetPosts = async (req, res) => {
		const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
		const q = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
		const allPosts = await Posts.find(q)
			.populate({
				path: 'userId',
				select: 'name avatar',
			})
			.sort(timeSort);
		handleSuccess(res, allPosts);
	};

	handleAddPost = async (req, res) => {
		try {
			let { userId, content, image = '' } = req.body;
			if (content === '') {
				handleError(res);
			}
			const newPost = await Posts.create({ userId, content, image });
			handleSuccess(res, newPost);
		} catch (error) {
			handleError(res);
		}
	};

	handleDeleteAllPosts = async (req, res) => {
		try {
			const deleteAllPostsResult = await Posts.deleteMany({});
			handleSuccess(res, deleteAllPostsResult.deletedCount);
		} catch (error) {
			handleError(res, error);
		}
	};

	handleDeletePost = async (req, res) => {
		const { id } = req.params;

		try {
			const deleteSinglePostResult = await Posts.findByIdAndDelete(id);
			handleSuccess(res, deleteSinglePostResult);
		} catch {
			handleError(res, error);
		}
	};

	handleUpdatePost = async (req, res) => {
		const { id } = req.params;
		const { content } = req.body;

		if (content === '') {
			handleError(res, '尚未填寫內容');
		}
		try {
			const updatePost = await Posts.findByIdAndUpdate(id, { content }, { new: true });
			handleSuccess(res, updatePost);
		} catch (error) {
			handleError(res, error);
		}
	};
};
