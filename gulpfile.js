const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

// compile scss into css
function style() {
  // 1. where is my scss files
  return gulp.src('./sass/**/*.scss')
    // 2. pass that files through sass compiler
    .pipe(sass())
    // 3. where do I save the compiled css?
    .pipe(gulp.dest('./css'))
    // 4. stream changes to all browser
    .pipe(browserSync.stream());
}

function js() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('app'))
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  });
  gulp.watch('./sass/**/*.scss', style);
  gulp.watch('./js/**/*.js', js);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./app/all.js').on('change', browserSync.reload);
}

exports.style = style;
exports.js = js;
exports.watch = watch;