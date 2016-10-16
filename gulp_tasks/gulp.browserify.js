var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp){
	gulp.task('browserify', 'Bundles app components' , function() {

		return browserify(config.src.js)
			.bundle()
			.pipe(source('app.js'))
			.pipe(gulp.dest(config.dist.js));
	});
}
