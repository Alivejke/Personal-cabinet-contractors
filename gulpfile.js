var gulp        = require('gulp'),
    less        = require('gulp-less'), 
    browserify  = require('browserify'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    connect     = require('gulp-connect'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    sourcemaps  = require('gulp-sourcemaps'),
    gutil       = require('gulp-util');

var SERVER_PORT = 5000;

gulp.task('hint', function () {
    gulp.src('dev/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify'  , function () {
    var b = browserify({
        entries: 'dev/js/app.js',
        debug: true
    });
    b.bundle()
        .on('error',  gutil.log)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps : true
        }))
        .on('error',  gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/app'))
        .pipe(connect.reload());
});

gulp.task('markups', function () {
    gulp.src('dev/html/index.html')
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
    gulp.src('dev/templates/**/*')
        .pipe(gulp.dest('build/templates/'))
        .pipe(connect.reload());
    gulp.src('dev/data/*.json')
        .pipe(gulp.dest('build/data'))       
        .pipe(connect.reload()); 
});

gulp.task('styles', function(){
    gulp.src('dev/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
    gulp.src('dev/less/bootstrap/fonts/*.*')
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('watch', ['hint'], function () {
    gulp.watch(['dev/js/*.js', 'dev/js/**/*.js'], ['hint', 'browserify'])
    gulp.watch(['dev/html/*.html', 'dev/templates/**/*'], ['markups'])
    gulp.watch(['dev/styles/*.less'], ['styles'])
});

gulp.task('server', function () {
    connect.server({
        port:SERVER_PORT,
        root:'build',
        livereload: true        
    })
});

gulp.task('default', [
        'hint',
        'browserify',
        'markups',
        'styles',
        'server',
        'watch'
    ]
);
