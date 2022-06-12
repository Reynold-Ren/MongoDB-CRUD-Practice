const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
const connectDB = require('./connections/connection')();

const app = express();

process.on('uncaughtException', (err) => {
	console.error('Uncaught Exception！');
	console.error(err);
	process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

const resErrorProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			message: err.message,
		});
	} else {
		console.error('出現重大錯誤', err);
		res.status(500).json({
			status: 'error',
			message: '系統錯誤，請聯絡工程師',
		});
	}
};

const resErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

app.use(function (err, req, res, next) {
	err.statusCode = err.statusCode || 500;
	if (process.env.NODE_ENV === 'dev') {
		return resErrorDev(err, res);
	}
	if (err.name === 'ValidationError') {
		err.message = '資料欄位未填寫正確，請重新輸入！';
		err.isOperational = true;
		return resErrorProd(err, res);
	}
	resErrorProd(err, res);
});

process.on('unhandledRejection', (err, promise) => {
	console.error('未捕捉到的 rejection：', promise, '原因：', err);
});

module.exports = app;
