const Post = require('../models/posts');
const responseHandle = require('../responseHandle');
const errHandle = require('../errorHandle');
const httpStatusCodes = require('../httpStatusCodes');

module.exports = class PostsController {
	handleGetPosts(req, res) {
		Post.find()
			.then((data) => {
				responseHandle(res, httpStatusCodes.OK, data)
			})
			.catch(err => {
				errHandle(res, httpStatusCodes.INTERNAL_SERVER, err.message)
			})
	}

	handleAddPost(req, res) {
		let body = "";

		req.on('data', chunk => {
			body += chunk;
		})

		req.on('end', () => {
			try {
				let { name, content, image, tags, type, likes, comments } = JSON.parse(body);

				image = image ? image : '';
				likes = likes ? likes : 0;
				comments = comments ? comments : 0;

				Post.create({ name, content, image, tags, type, likes, comments })
						.then( data => {
							const result = {
								id: data._id
							}
							responseHandle(res, httpStatusCodes.OK, result)
						})
						.catch( err => {
							errHandle(res, httpStatusCodes.INTERNAL_SERVER, err.errors);
						})
			} catch(error) {
				errHandle(res, httpStatusCodes.INTERNAL_SERVER, error.message);
			}}
		)
	}

	handleDeletePost(req, res) {
		if ( req.url.startsWith("/posts/") ) {
			const id = req.url.split('/').pop();
			
			Post.findByIdAndDelete(id)
					.then( () => {
						responseHandle(res, httpStatusCodes.OK, `刪除成功`);
					})
					.catch( err => {
						errHandle(res, httpStatusCodes.BAD_REQUEST, '查無此 ID');
					})
		} else {
			Post.deleteMany({})
					.then( data => {
						responseHandle(res, httpStatusCodes.OK, `刪除成功，共刪除 ${ data.deletedCount } 筆`);
					})
					.catch( err => {
						console.log(err.errors);
					})
		}
	}

	handleUpdatePost(req, res) {
		let body = "";

		req.on('data', chunk => {
			body += chunk;
		})
	
		req.on('end', () => {
			try {
				const data = JSON.parse(body);
				const id = req.url.split('/').pop();

				Post.findByIdAndUpdate(id, data, { runValidators: true })
					.then( data => {
						responseHandle(res, httpStatusCodes.OK, data);
					})
					.catch( err => {
						console.log(err);
						errHandle(res, httpStatusCodes.BAD_REQUEST, err.errors);
					})

			} catch(error) {
				errHandle(res, httpStatusCodes.INTERNAL_SERVER, error.message);
			}
		})
	}
}