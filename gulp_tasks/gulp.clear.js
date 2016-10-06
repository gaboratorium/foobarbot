var del = require('del');

// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp){
	gulp.task('clear', 'Clears dist folder' , function() {
		return del(config.dist.root + '**/*');
	});
}
