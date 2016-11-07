// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp) {
	gulp.task('copy_assets', "Copy asset files", function() {
	  return gulp
	  	.src([
	  		config.src.copy_assets,
	  		])
	    .pipe(gulp.dest(config.dist.assets));
	});
};