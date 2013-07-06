var crypto = require('crypto');

var Decorator = module.exports = function Decorator(data) {
	return {
		"data": data,
		"hash": crypto.createHash('md5').update(JSON.stringify(data)).digest("hex"),
		"modified": new Date().toISOString()
	};
};