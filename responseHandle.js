const headers = require('./baseHeader');

function responseHandle(res, status, data) {
	res.writeHead(status, headers);
	if ( data ) {
		res.write(JSON.stringify({
			'status': "Success",
			"data": data,
		}));
	}
	res.end();
}

module.exports = responseHandle;