const Posts = require('../models/posts');
const handleSuccess = require('../handle/handleSuccess');
const appError = require('../handle/appError');

module.exports = class PostsController {
	handleGetPosts = async (req, res, next) => {
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

	handleAddPost = async (req, res, next) => {
		let { userId, content, image = '' } = req.body;
		if (!content) {
			return next(appError(400, 'content 不得為空', next));
		}
		if (!userId) {
			return next(appError(400, '未帶入使用者', next));
		}
		const newPost = await Posts.create({ userId, content, image });
		handleSuccess(res, newPost);
	};

	handleDeleteAllPosts = async (req, res, next) => {
		const deleteAllPostsResult = await Posts.deleteMany({});
		handleSuccess(res, deleteAllPostsResult.deletedCount);
	};

	handleDeletePost = async (req, res, next) => {
		const { id } = req.params;

		const deleteSinglePostResult = await Posts.findByIdAndDelete(id);
		if (!deleteSinglePostResult?.deletedCount) {
			return next(appError(400, '該文章不存在', next));
		}
		handleSuccess(res, deleteSinglePostResult);
	};

	handleUpdatePost = async (req, res, next) => {
		const { id } = req.params;
		const { content } = req.body;
		if (!content) {
			return next(appError(400, '尚未填寫內容', next));
		}
		const updatePost = await Posts.findByIdAndUpdate(id, { content }, { new: true });
		if (!updatePost) {
			return next(appError(400, '該文章不存在', next));
		}
		handleSuccess(res, updatePost);
	};
};
