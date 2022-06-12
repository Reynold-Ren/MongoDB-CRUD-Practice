const Users = require('../models/users');
const handleSuccess = require('../handle/handleSuccess');
const appError = require('../handle/appError');

module.exports = class UsersController {
	handleAddUser = async (req, res, next) => {
		const { email, name } = req.body;
		if (!email) {
			return next(appError(400, '未帶入信箱', next));
		}
		if (!name) {
			return next(appError(400, '未帶入姓名', next));
		}
		const newUser = await Users.create({ email, name });
		handleSuccess(res, newUser);
	};
};
