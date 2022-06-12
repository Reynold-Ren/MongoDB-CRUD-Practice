const Users = require('../models/users');
const handleSuccess = require('../handle/handleSuccess');
const appError = require('../handle/appError');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { generateSendJWT } = require('../service/auth');

module.exports = class UsersController {
	signUp = async (req, res, next) => {
		let { email, name, password, confirmPassword } = req.body;
		if (!email || !name || !password || !confirmPassword) {
			return next(appError(400, '欄位未正確填寫', next));
		}
		if (name.length <= 1) {
			return next(appError(400, '名字長度至少 2 個字', next));
		}
		if (password !== confirmPassword) {
			return next(appError(400, '兩次密碼輸入並不一致', next));
		}
		if (!validator.isLength(password, { min: 8 })) {
			return next(appError('400', '密碼字數低於 8 碼', next));
		}
		if (!validator.isEmail(email)) {
			return next(appError('400', 'Email 格式不正確', next));
		}

		const user = await Users.findOne({ email }).exec();

		if (user) {
			return next(appError('400', '此帳號已有人使用，請試試其他 Email 帳號', next));
		}

		password = await bcrypt.hash(password, 12);

		const newUser = await Users.create({
			email,
			password,
			name,
		});

		return generateSendJWT(newUser, 200, res);
	};
	signIn = async (req, res, next) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(appError(400, '缺少必填欄位', next));
		}
		const user = await Users.findOne({ email }).select('+password');
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return next(appError(400, '您的密碼不正確', next));
		}
		return generateSendJWT(user, 200, res);
	};
	getProfile = async (req, res, next) => {
		const { id } = req.user;
		const userProfile = await Users.findById(id);
		handleSuccess(res, userProfile);
	};
	updatePassword = async (req, res, next) => {
		const { id } = req.user;
		const { password, confirmPassword } = req.body;
		if (!validator.isLength(password, { min: 8 })) {
			return next(appError('400', '密碼字數低於 8 碼', next));
		}
		if (password !== confirmPassword) {
			return next(appError('400', '兩次密碼填寫不一致', next));
		}
		const newPassword = await bcrypt.hash(password, 12);

		const user = await Users.findByIdAndUpdate(id, {
			password: newPassword,
		});
		return generateSendJWT(user, 200, res);
	};
	updateProfile = async (req, res, next) => {
		const { id } = req.user;
		const { name, avatar, gender } = req.body;

		if (!name && !avatar && !gender) {
			return appError(400, '修改的欄位未正確填寫', next);
		}

		if (!validator.isURL(avatar)) {
			return appError(400, '照片格式填寫錯誤', next);
		}

		const userData = { name, avatar, gender };
		const editUserResult = await Users.findByIdAndUpdate(id, userData, { new: true, runValidators: true });

		if (!editUserResult) {
			return next(appError(400, '查無此 User', next));
		}
		return handleSuccess(res, editUserResult);
	};
};
