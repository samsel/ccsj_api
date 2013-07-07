var fs 			= require('fs'),
    config 		= require('../config'),
    cronJob = require('cron').CronJob,
    decorator 	= require('./decorator'),
	rootPage 	= require('./root_page'),
	sermonsPage = require('./sermons_page');


var Sermons = module.exports = function Sermons() {

	function fetchLocal(hash, callback) {
		fs.readFile(config.file, {encoding: 'utf8'}, function(err, data) {
        	if (err) throw err;
        	data = JSON.parse(data);
        	callback(filter(hash, data));
    	});
	}

	function filter(clientHash, localData) {
		if(clientHash === localData.hash) {
			// empty the array obj,
			// since the client already
			// has the same version of the data object
			localData.data = [];
		}
		return localData;
	}


	function fetchRemote() {
		var data = [];
		sermonsPage.fetch(function(d) {
			data.push(d);
			rootPage.fetch(function(data) {
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

	function init() {
		// run the job at 12:01 AM everyday
		new cronJob('00 01 12 * * *', function() {
			fetchRemote();
		}, null, true);		
	}

	return {
		fetch: fetchLocal,
		init: init
	}
}();