var gulp = require('gulp-help')(require('gulp'));

// Imports libs script - compile all js file in one file called libs.js
require('./gulp_tasks/gulp.libs.concat')(gulp);

// Compile TypeScript
require('./gulp_tasks/gulp.typescript')(gulp);

// Compile TypeScript
require('./gulp_tasks/gulp.copy')(gulp);

// Clear dist folder
require('./gulp_tasks/gulp.clear')(gulp);

// Build dist
gulp.task('build', ['clear', 'copy', 'libs.concat', 'typescript']);