'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    reload = browserSync.reload;

//////////////////////////////
// Internal Vars
//////////////////////////////
var toSass = [
  'sass/*.scss'
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, SassPaths) {
  // Set value of paths to either the default or user entered
  SassPaths = SassPaths || toSass;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var SassTask = function (path) {
    return gulp.src(SassPaths)
      .pipe(compass({
        errLogToConsole: true
      }))
        .pipe(minifyCSS())
      .pipe(gulp.dest('css'))
      .pipe(reload({stream: true}));
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('compass', function () {
    return SassTask(SassPaths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('compass:watch', function () {
    return gulp.watch(SassPaths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return SassTask(event.path.absolute);
      });
  });
}
