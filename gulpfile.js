const gulp   = require('gulp');
const babel  = require('gulp-babel');
const rename = require('gulp-rename');

gulp.task('react', () => {
    return gulp.src('./js/*.jsx')
        .pipe(babel())
        .pipe(rename(function (dir, base, ext) {
            return base + '.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['react']);
