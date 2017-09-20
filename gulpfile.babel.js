import gulp from 'gulp'
import babel from 'gulp-babel'
import clean from 'gulp-clean'
import mocha from 'gulp-mocha'

gulp.task('default', ['clean', 'build'])

gulp.task('clean', () => {
  return gulp
    .src('dist', {
      read: false
    })
    .pipe(clean())
})

gulp.task('build', ['clean'], () => {
  return gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('test', () => {
  return gulp
    .src('src/**/*.spec.js')
    .pipe(mocha({
      reporter: 'nyan',
      compilers: 'js:babel-core/register'
    }))
})

gulp.task('watch', () => {
  return gulp
    .watch('src/**/*.js', ['test'])
})
