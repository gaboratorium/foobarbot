// Import gulp concat
var concat = require('gulp-concat');

// Import config
var config = require('./gulp.config.js');

module.exports = function(gulp){

	gulp.task('libs.concat', 'Process the scripts from the external libs' , function() {
		return gulp
			.src(config.libs.js)
			.pipe(concat('libs.js'))
			.pipe(gulp.dest(config.dist.js));
	});
};
