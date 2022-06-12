const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'user',
			required: [true, '使用者 ID 未填寫'],
		},
		content: {
			type: String,
			required: [true, 'Content 未填寫'],
		},
		image: {
			type: String,
			default: '',
		},
		likes: {
			type: Number,
			default: 0,
			validate: {
				validator: (v) => {
					return v >= 0 ? true : false;
				},
				message: 'Likes 欄位不得小於 0',
			},
		},
		createAt: {
			type: Date,
			default: Date.now,
			select: false,
		},
	},
	{
		versionKey: false,
	}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
