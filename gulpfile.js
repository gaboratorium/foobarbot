var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('gulp-run-sequence')

// Concat js
require('./gulp_tasks/gulp.libs.js.concat')(gulp);
require('./gulp_tasks/gulp.app.js.concat')(gulp);

// Copy html
require('./gulp_tasks/gulp.copy')(gulp);

// Clear dist folder
require('./gulp_tasks/gulp.clear')(gulp);

// Build dist
gulp.task('build', "Build solution", function(){
	runSequence('copy', 'libs.js.concat', 'app.js.concat')
});


