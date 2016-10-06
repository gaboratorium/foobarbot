// Import gulp typescript
var typescript = require('gulp-typescript');
const tscConfig = require('./../tsconfig.json');
var concat = require('gulp-concat');

// Import config
var config = require('./gulp.config.js');

// TypeScript compile and concat
module.exports = function(gulp){

	gulp.task('typescript', 'Compile TypeScript files', function () {
	  return gulp
	    .src(config.src.ts)
	    .pipe(typescript(tscConfig.compilerOptions))
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest(config.dist.js));
	});
}