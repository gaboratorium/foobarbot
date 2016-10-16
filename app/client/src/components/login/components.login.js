// Login Component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/components.login.html', 'utf8');

// Export component
module.exports = {
	template: html
}