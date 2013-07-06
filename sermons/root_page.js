var Page = require('./page'),
	RootPage = function RootPage() {};


RootPage.prototype = new Page();

RootPage.prototype.parse = function(body) {
	var sermons = [],
		sermon,
		$ = this.$,
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
};

module.exports = new RootPage();