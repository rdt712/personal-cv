var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('default', ['browser-sync'], function () {
    gulp.watch('js/*.js', ['js', browserSync.reload]);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('index.html', ['bs-reload']);
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init({
		proxy: 'http://localhost:3000',
        browser: 'google chrome',
        port: 4000
	});
});

gulp.task('js', function() {
    return gulp.src('js/*.js');
});

gulp.task('css', function () {
    return gulp.src('css/*.css').pipe(browserSync.reload({ stream: true }));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'server.js',
        watch: ['server.js']
	}).on('start', function onStart() {
		if (!started) {
			cb();
			started = true;
		}
	}).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, BROWSER_SYNC_RELOAD_DELAY);
    });
});
