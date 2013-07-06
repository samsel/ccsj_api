var fs 			= require('fs'),
    config 		= require('../config'),
    decorator 	= require('./decorator'),
	rootPage 	= require('./root_page'),
	sermonsPage = require('./sermons_page');


var Sermons = module.exports = function Sermons() {

	var sPage = sermonsPage(config.url),
		rPage = rootPage(config.url);

	function fetchLocal() {
		fs.readFile(config.file, {encoding: 'utf8'}, function(err, data) {
        	if (err) throw err;
        	callback(data);
    	});
	}

	function fetchRemote() {
		var data = [];
		rPage.fetch(function(d) {
			data.push(d);
			sPage.fetch(function(data) {
				data.push(d);
				save(data);
			});
		});
	}

	function save(data) {
		fs.writeFile(config.file, JSON.stringify(decorator(data)), function (err) {
		  if (err) throw err;
		  console.dir('Saved ' + config.file);
		});
	}	

	return {
		update: fetchRemote,
		fetch: fetchLocal
	}
}();

