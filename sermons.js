var request = require('request'),
    fs 		= require('fs'),
    $ 		= require('jquery'),
    crypto	= require('crypto'),
    config 	= require('./config');


function Sermons() {

	function fetch(callback) {
		fs.readFile(config.file, {encoding: 'utf8'}, function(err, data) {
        	if (err) throw err;
        	callback(data);
    	});
	}

	function save(data) {
		fs.writeFile(config.file, JSON.stringify(data), function (err) {
		  if (err) throw err;
		  console.dir('Saved ' + config.file);
		});
	}

	function fetchRemote() {
		request(config.url, function (error, response, body) {
		  if (!error && response.statusCode === 200) {
		  	var sermons = parse(body);
		  	if(sermons.length) {
				save(decorate(sermons));
		  	}
		  }
		});
	}

	function parse(body) {
		var sermons = [],
			sermon,
			doc = $(body);

		function isSermonsPage() {
			return doc.find('#subcontent').find('h1:first').html() === "Sermon Archives";
		}	

		if(!isSermonsPage()) {
			throw new Error("isSermonsPage Validation Failed!");
		}

		doc.find('#subcontent').find('table').each(function(index, table) {
			var month = $(table).prev("h2").html();
			$(table).find('tr').each(function(index, row) {
				if(index !== 0) {
					sermon = {};
					$(row).find('td').each(function(index, column) {
						if(index === 0) {
							sermon.date = $(column).html();
						}
						if(index === 0) {
							sermon.date = $(column).html();
						}
						else if(index === 1) {
							sermon.topic = $(column).html();
						}
						else if(index === 2) {
							sermon.pastor = $(column).html();
						}
						else if(index === 3) {
							sermon.url = $(column).find('a').attr('href');
						}		
					});

					sermons.push(sermon);
				}
			});
		});

		return sermons;
	}

	function decorate(data) {
		return {
			"sermons": data,
			"hash": crypto.createHash('md5').update(JSON.stringify(data)).digest("hex"),
			"modified": new Date().toISOString()
		};
	}

	return {
		fetchRemote: fetchRemote,
		fetch: fetch
	};
}

module.exports = Sermons();