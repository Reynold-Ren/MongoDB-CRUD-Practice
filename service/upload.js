const multer = require('multer');
const path = require('path');
const appError = require('../handle/appError');

const upload = multer({
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter(req, file, cb) {
		const ext = path.extname(file.originalname).toLowerCase();
		if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
			cb(appError(400, '檔案格式錯誤，僅接受 jpg、jpeg 與 png。', cb));
		}
		cb(null, true);
	},
}).any();

module.exports = upload;