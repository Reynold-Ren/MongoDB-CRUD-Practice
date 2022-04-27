var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var app = express();
const connectDB = require('./connection')();
var postsRouter = require('./routes/posts');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postsRouter);

app.use(function(req, res, next) {
  res.json(createError(404));
});

module.exports = app;