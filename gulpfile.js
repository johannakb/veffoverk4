const gulp = require('gulp');

gulp.task('lint-javascript', () => {
	return gulp.src(['./*.js'])
		.pipe(eslint())
		.pipe(eslint.reporter(stylish))
		.pipe(eslint.reporter('fail'));

});

gulp.task('lint-scss', function() => {
	return gulp.src('/scss/**/*.scss')
		.pipe(stylelint())
		.pipe(stylelint.format())
		.pipe(stylelint.failOnError());

});

gulp.task('serve', function() => {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(['./*.html', './*.js']).on('change', browserSync.reload);
  	gulp.watch(['./scss/**/*.scss'], ['sass']);

});

gulp.task('sass', function () {
	gulp.src('./scss/**/*.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./css'))
    	.pipe(browserSync.stream());

});

gulp.task('babel', function() => {
	gulp.src('./js/**/*.js')
		//wtf

});

gulp.task('lint', ['lint-scss', 'lint-javascript']);

gulp.task('default', ['lint', 'sass', 'babel', 'serve']);
