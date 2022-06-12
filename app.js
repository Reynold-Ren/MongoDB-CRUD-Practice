const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./connections/connection')();
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
	res.json(createError(404));
});

module.exports = app;
