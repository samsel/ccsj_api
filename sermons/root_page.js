var request = require('request'),
    $ 		= require('jquery');


var RootPage = module.exports = function RootPage(urlObj) {

	function url() {
		return urlObj.base;
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

		doc.find('#wrapper2 #mainContainer #main table').children().find('td:first > p:not(:last)').each(function(index, el) {
			sermon = {};
            sermon.date = $(el).find('strong').text();
			sermon.url = $(el).find('a:last').attr('href');           
            $(el).find('strong').remove();
            $(el).find('a').remove();
            sermon.topic = $(el).text();
            sermon.pastor = $(el).text();
            sermons.push(sermon);	
		
		});

		return sermons;
	}

	return {
		fetch: fetch
	};
};