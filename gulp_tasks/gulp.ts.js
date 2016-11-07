// Import gulp typescript
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var tsProject = ts.createProject("./tsconfig.json");
var config = require('./gulp.config.js');

module.exports = function(gulp){

	gulp.task('ts', 'Compile and concatenate Typescript files' , function() {
		return tsProject.src()
            .pipe(tsProject())
            .pipe(concat('app.js'))
            .pipe(gulp.dest(config.dist.js));
	});
};
