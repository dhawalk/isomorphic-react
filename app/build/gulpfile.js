// var gulp = require('gulp');
// require('gulp-task-loader')();
var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp-tasks', {recurse: true});



gulp.task('default', function () {
	gulp.start('browserify_task');
});