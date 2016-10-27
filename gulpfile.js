/* eslint-env node */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');
const sass = require('gulp-sass');
const babel = require("gulp-babel");

gulp.task('lint-javascript', () => {
		// ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['src/**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});

gulp.task('lint-scss', () => {
	return gulp
    .src('src/**/*.scss')
    .pipe(gulpStylelint({
			failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(['./*.html', './*.js']).on('change', browserSync.reload);
  	gulp.watch(['./scss/**/*.scss'], ['sass']);

});

gulp.task('sass', function () {
  return gulp.src("src/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist"));
});

gulp.task('babel', () => {
	return gulp.src('src/**/*.js')
    .pipe(babel({
    presets: ['es2015']
   }))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', ['lint-scss', 'lint-javascript']);

gulp.task('default', ['lint', 'sass', 'babel', 'serve']);
