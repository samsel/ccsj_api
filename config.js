module.exports = {
	file: "data.json",
	url: {
		base: "http://www.calvarysj.org/",
		sermons: "?page_id=1310"
	},
	port: (process.env.VCAP_APP_PORT || 3000)
}; 