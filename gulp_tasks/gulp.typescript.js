// Import gulp typescript
const typescript = require('gulp-typescript');
const tscConfig = require('./../tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

// Import config
const config = require('./gulp.config.js');

// TypeScript compile and concat
module.exports = function(gulp){

	gulp.task('typescript', 'Compile TypeScript files', function () {
	  return gulp
	    .src(config.src.ts)
	    // .pipe(sourcemaps.init())
	    .pipe(typescript(tscConfig.compilerOptions))
	    // .pipe(sourcemaps.write('.'))
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest(config.dist.js));
	});
}