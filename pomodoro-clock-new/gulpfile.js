var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('scripts', function() {
	return gulp.src('js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'));
});

gulp.task('sass', function() {
	return sass('scss/style.scss', {style: 'compressed'})
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('build/css'));
});

gulp.task('img-min', function() {
	return gulp.src('img/*')
		.pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
		.pipe(gulp.dest('build/img'));
});

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('scss/style.scss', ['sass'])
	gulp.watch('img/*', ['img-min']);
});

gulp.task('default', ['scripts', 'sass', 'img-min', 'watch']);