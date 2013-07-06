var request = require('request'),
    $ 		= require('jquery');


var SermonsPage = module.exports = function SermonsPage(urlObj) {

	function url() {
		return urlObj.base + urlObj.sermons;
	}

	function fetch(callback) {
		request(url(), function (error, response, body) {
		  if (!error && response.statusCode === 200) {
		  	callback(parse(body));
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

	return {
		fetch: fetch
	};
};