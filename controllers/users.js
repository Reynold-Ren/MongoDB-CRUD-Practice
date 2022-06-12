const Users = require('../models/users');
const handleSuccess = require('../handle/handleSuccess');

module.exports = class UsersController {
	handleAddUser = async (req, res) => {
		const { email, name } = req.body;
		const newUser = await Users.create({ email, name });
		handleSuccess(res, newUser);
	};
};
