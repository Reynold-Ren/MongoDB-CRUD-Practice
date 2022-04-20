const headers = require('./baseHeader');

function errorHandle(res, statusCode, errMessage) {

	res.writeHead(statusCode, headers);
	res.write(JSON.stringify({
		'status': "Failed",
		"message": errMessage,
	}));
	res.end();
}

module.exports = errorHandle;