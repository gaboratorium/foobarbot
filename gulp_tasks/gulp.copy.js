// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp) {
	gulp.task('copy', "Copy static files and assets to dist", function() {
	  return gulp
	  	.src([
	  		config.src.root + 'index.html',
	  		config.src.root + 'styles.css'
	  		])
	    .pipe(gulp.dest(config.dist.root))
	});
}