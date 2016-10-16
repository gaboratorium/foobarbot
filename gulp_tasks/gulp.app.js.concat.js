// Import gulp concat
var concat = require('gulp-concat');

// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp){

	gulp.task('app.js.concat', 'Concatenates the scripts of the application' , function() {
		return gulp
			.src(config.src.js)
			.pipe(concat('app.js'))
			.pipe(gulp.dest(config.dist.js));
	});
};
