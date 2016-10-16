// Settings component
// Template
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/components.settings.html', 'utf8')

// Export component
module.exports = {
	template: html
}