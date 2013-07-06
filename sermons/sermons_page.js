var Page = require('./page'),
	SermonsPage = function SermonsPage() {};

SermonsPage.prototype = new Page();


SermonsPage.prototype.url = function() {
	return this.urlObj.base + this.urlObj.sermons;
};

SermonsPage.prototype.parse = function(body) {
	var sermons = [],
		sermon,
		$ = this.$,
		doc = $(body);


	function sermonsPageHeader() {
		return doc.find('#subcontent').find('h1:first').html();
	}	

	function isSermonsPage() {
		return sermonsPageHeader() === "Sermon Archives";
	}	

	if(!isSermonsPage()) {
		throw new Error("isSermonsPage Validation Failed! FOUND: " + sermonsPageHeader());
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
};

//TODO: expose only the methods required, right now the entire object is exposed
module.exports = new SermonsPage();