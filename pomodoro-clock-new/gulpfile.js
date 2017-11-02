var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
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

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('scss/style.scss', ['sass'])
});

gulp.task('default', ['scripts', 'sass', 'watch']);