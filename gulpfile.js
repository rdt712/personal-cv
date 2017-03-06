var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');

// process CSS files and return the stream.
gulp.task('css', function() {
    return gulp.src('css/*.css')
        .pipe(gulp.dest('dist/css'));
});

// create a task that ensures the `css` task is complete before
// reloading browsers
gulp.task('css-watch', ['css'], function(done) {
    browserSync.reload();
    done();
});

// process JS files and return the stream.
gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('dist/js'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], function(done) {
    browserSync.reload();
    done();
});

// Static server
gulp.task('serve', ['js', 'css'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("index.html").on('change', browserSync.reload);
    gulp.watch("css/*.css", ['css-watch']);
    gulp.watch("js/*.js", ['js-watch']);
});
