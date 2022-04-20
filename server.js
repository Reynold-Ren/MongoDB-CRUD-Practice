const http = require('http');
const connectDB = require('./connection');
const responseHandle = require('./responseHandle');
const errHandle = require('./errorHandle');
const httpStatusCodes = require('./httpStatusCodes');
const PostsController = require('./controllers/posts');

connectDB();

const requestListenner = (req, res) => {

	if ( req.url.indexOf('/posts') !== -1 ) {

		postsController = new PostsController();

		switch(req.method) {
			case 'GET':
				postsController.handleGetPosts(req, res);
				break;
			case 'POST':
				postsController.handleAddPost(req, res);
				break;
			case 'DELETE':
				postsController.handleDeletePost(req, res);
				break;
			case 'PATCH':
				postsController.handleUpdatePost(req, res);
				break;
			case 'OPTIONS':
				responseHandle(res, httpStatusCodes.OK);
				break;
			default:
				errHandle(res, httpStatusCodes.INTERNAL_SERVER, '錯誤的 Method.');
		}

	} else {
		errHandle(res, httpStatusCodes.NOT_FOUND, '查無此路由.');
	}
}

const server = http.createServer(requestListenner);
server.listen(process.env.PORT);