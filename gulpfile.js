var gulp = require('gulp-help')(require('gulp'));
var runSequence = require('gulp-run-sequence')
var config = require('./gulp_tasks/gulp.config.js');

// Concat js
require('./gulp_tasks/gulp.libs.js.concat')(gulp);
require('./gulp_tasks/gulp.app.js.concat')(gulp);

// Copy static
require('./gulp_tasks/gulp.copy_index')(gulp);
require('./gulp_tasks/gulp.copy_assets')(gulp);

// Clear dist folder
require('./gulp_tasks/gulp.clear')(gulp);

// Build dist
gulp.task('build', "Build solution", function(){
	runSequence('copy_index', 'libs.js.concat', 'app.js.concat')
});

gulp.task('watch', 'Builds the solution, then starts watching the files', function () {
    runSequence('build', 'watch-files');
});

gulp.task('watch-files', 'Watch files for change to execute tasks', function(){
    gulp.watch(config.src.copy_index, ['copy_index']);
    gulp.watch(config.src.copy_assets, ['copy_assets']);
    gulp.watch(config.libs.js, ['libs.js.concat']);
    gulp.watch(config.src.js, ['app.js.concat']);
});