// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/component.about.html', 'utf8');

// Export global component
module.exports = {
	name: "AboutComponent",
	template: html,
	props: {
		user: Object
	},
	data: function(){
		return {
		}
	},
	methods: {

	}
};