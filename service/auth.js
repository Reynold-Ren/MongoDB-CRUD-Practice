const jwt = require('jsonwebtoken');
const appError = require('../handle/appError');
const handleErrorAsync = require('../handle/handleErrorAsync');
const User = require('../models/users');

const isAuth = handleErrorAsync(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		[, token] = req.headers.authorization.split(' ');
	}

	if (!token) {
		return next(appError(401, '你尚未登入！', next));
	}

	const decoded = await new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
			if (err) {
				reject(err);
			} else {
				resolve(payload);
			}
		});
	});
	const currentUser = await User.findById(decoded.id);

	req.user = currentUser;
	return next();
});
const generateSendJWT = (user, statusCode, res) => {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_DAY,
	});

	user.password = undefined;
	res.status(statusCode).json({
		status: 'success',
		user: {
			token,
			name: user.name,
		},
	});
};

module.exports = {
	isAuth,
	generateSendJWT,
};
