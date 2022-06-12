const handleSuccess = require('../handle/handleSuccess');
const appError = require('../handle/appError');
const sizeOf = require('image-size');
const { ImgurClient } = require('imgur');

module.exports = class UploadController {
	upload = async (req, res, next) => {
		const { type = 'photo' } = req.body;
		if (!req.files.length) {
			return next(appError(400, '尚未上傳檔案', next));
		}
		if (type === 'avatar') {
			const dimensions = sizeOf(req.files[0].buffer);
			if (dimensions.width !== dimensions.height) {
				return next(appError(400, '大頭貼長寬不符合 1:1 比例', next));
			}
		}
		const client = new ImgurClient({
			clientId: process.env.IMGUR_CLIENTID,
			clientSecret: process.env.IMGUR_CLIENT_SECRET,
			refreshToken: process.env.IMGUR_REFRESH_TOKEN,
		});

		const response = await client.upload({
			image: req.files[0].buffer.toString('base64'),
			type: 'base64',
			album: process.env.IMGUR_ALBUM_ID,
		});

		return handleSuccess(res, response.data.link);
	};
};
