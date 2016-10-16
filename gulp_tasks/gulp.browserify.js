var browserify = require('browserify');
var source = require('vinyl-source-stream');
var fs = require('fs');

// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp){
	gulp.task('browserify', 'Bundles app components' , function() {

		return browserify(config.src.js)
			.transform('brfs')
			.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest(config.dist.js));
	});
}
