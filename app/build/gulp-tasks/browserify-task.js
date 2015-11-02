var gulp = require('gulp');
var browserify = require('browserify');
var path = require('path');
var mkdirp = require('mkdirp');
var config = require('../gulp-config.js').browserify;
var reactify = require('reactify');
var fs = require('fs');


var source = require('vinyl-source-stream')


var task = function () {

	var absoluteJSDirPath = path.join(__dirname, '../' + config.bundleConfig.jsDir);
	mkdirp.sync(absoluteJSDirPath);

	// console.log(path.join(__dirname, config.bundleConfig.common));
	var fd = fs.openSync(absoluteJSDirPath + '/common.js', 'w');
	fs.closeSync(fd);

	// ------ Factor Bundle
	// var b = browserify(config.bundleConfig.entries);
	// b.transform('reactify');
	// b.plugin('factor-bundle', { outputs: config.bundleConfig.outputs } );
	// b.bundle().pipe(fs.createWriteStream(absoluteJSDirPath + '/common.js'));
	// 
	// 
	// ---- Partition Bundle
	// var b = browserify();
	// b.plugin('partition-bundle', {
	// 	map: {
	// 		"bundle-main.js": ['../router/client/router'],
	// 		"bundle-user.js": ['../pages/user/view/client/user-view.jsx'],
	// 		"bundle-settings.js": ['../pages/settings/view/client/settings-view.jsx']
	// 	},
	// 	output: '../../public/js/'
	// });
	// b.transform('reactify');
	// b.bundle();

	var commonModules = ['react', 'react-dom', 'central-event', 'async'];
	var b = browserify({})
	commonModules.forEach(function(module) {
		b.require(module)
	});
	b.bundle()
	 .pipe(source('common.js'))
	 .pipe(gulp.dest('../../public/js'));


	 var b = browserify('../pages/user/view/user-view.jsx');
		commonModules.forEach(function(module) {
			b.external(module)
		});
		b.require('../pages/user/view/user-shared.jsx', {expose: 'user'});
		b.require('../pages/user/view/user-view.jsx', {expose: 'user-init'});
		b.require('../pages/user/store/user-store.js', {expose: 'user-store'});
		b.transform('reactify');
		b.bundle()
		 .pipe(source('user.js'))
	     .pipe(gulp.dest('../../public/js'))

	    commonModules.push('user-init');
	    commonModules.push('user-store');

	var b = browserify('../pages/settings/view/settings-view.jsx');
		commonModules.forEach(function(module) {
			b.external(module)
		});
		b.require('../pages/settings/view/settings-shared.jsx', {expose: 'settings'});
		b.require('../pages/settings/view/settings-view.jsx', {expose: 'settings-init'});
		b.require('../pages/settings/store/settings-store.js', {expose: 'settings-store'});
		b.transform('reactify');
		b.bundle()
		 .pipe(source('settings.js'))
	     .pipe(gulp.dest('../../public/js'))

	     
	    commonModules.push('settings-init');
	    commonModules.push('settings-store');

	var b = browserify('../router/client/router', {})
		commonModules.forEach(function(module) {
			b.external(module)
		});
		b.bundle()
		 .pipe(source('router.js'))
	     .pipe(gulp.dest('../../public/js'))
}

gulp.task('browserify_task', task);

module.exports = task;