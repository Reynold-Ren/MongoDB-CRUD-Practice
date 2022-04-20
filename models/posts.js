const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, '貼文姓名未填寫'],
		validate: {
			validator: (v) => {
				return /^[\u4e00-\u9fa5]+$|^[a-zA-Z\s]+$/.test(v);
			},
			message: props => `${ props.value } 含有特殊字元`
		}
	},
	content: {
    type: String,
    required: [true, 'Content 未填寫'],
  },
	image: {
    type: String,
    default: ""
  },
	tags: [
		{
			type: String,
			require: [true, '貼文標籤 Tags 未填寫']
		}
	],
	type: {
		type: String,
    enum:['group','person'],
    required: [true, '貼文類型 Type 未填寫']
	},
	likes: {
    type: Number,
    default: 0,
		validate: {
			validator: (v) => {
				return v >= 0 ? true : false
			},
			message: 'Likes 欄位不得小於 0'
		}
  },
  comments: {
    type: Number,
    default: 0,
		validate: {
			validator: (v) => {
				return v >= 0 ? true : false
			},
			message: 'Comments 欄位不得小於 0'
		}
  },
	createAt: {
    type: Date,
    default: Date.now,
    select: false
  },
},{
	versionKey: false
})

const posts = mongoose.model('Post', postSchema);

module.exports = posts;