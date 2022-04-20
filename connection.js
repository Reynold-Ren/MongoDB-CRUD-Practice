const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config({path: "./config.env"})

const DB = process.env.DATABASE.replace(
	'<password>',
	process.env.DATABASE_PASSWORD
)

const connectDB = () => {
	mongoose.connect(DB)
	.then(() => {
		console.log('Connect Successfully');
	})
	.catch(err => {
		console.log(err);
	})
}

module.exports = connectDB;