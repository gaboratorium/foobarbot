var browserify = require('browserify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
// brfs
var fs = require('fs');

// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp){
	gulp.task('browserify', 'Bundles app components' , function() {

		return browserify(config.src.browserify)
			.add(config.libs.types)
			.plugin(tsify, { noImplicitAny: true })
			.transform('brfs')
			.bundle()
			.on('error', function (error) { console.error(error.toString()); })
			.pipe(source('app.js'))
			.pipe(gulp.dest(config.dist.js));
	});
}
