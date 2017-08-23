var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function() {
	return sass('style.scss', {style: 'compressed'})
		.pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
	gulp.watch('style.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);