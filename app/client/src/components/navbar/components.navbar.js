// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/components.navbar.html', 'utf8')

// Export global component
module.exports =  {
	name: "NavbarComponent",
	template: html,
	data: function(){
		return {
			userName: "Gabor"
		}
	},
	methods: {
	}
};