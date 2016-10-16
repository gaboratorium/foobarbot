// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp) {
	gulp.task('copy_index', "Copy index", function() {
	  return gulp
	  	.src([
	  		config.src.copy_index,
	  		])
	    .pipe(gulp.dest(config.dist.root))
	});
}