import gulp from 'gulp'
import babel from 'gulp-babel'
import clean from 'gulp-clean'

gulp.task('default', ['clean', 'build'])

gulp.task('clean', () => {
  return gulp
    .src('dist', {read: false})
    .pipe(clean())
})

gulp.task('build', ['clean'], () => {
  return gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})
