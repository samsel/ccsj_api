var request = require('request'),
    jquery	= require('jquery'),
    config  = require('../config');


var Page = module.exports = function Page(urlObj) {
	this.request = request;
	this.$		 = jquery;
	this.urlObj  = config.url;
};

Page.prototype.url = function() {
	return this.urlObj.base;
};

Page.prototype.fetch = function(callback) {
	var self = this;
	this.request(this.url(), function(error, response, body) {
		if (error) throw error;
		callback(self.parse(body));
	});
};

Page.prototype.parse = function(body) {
	return [];
};