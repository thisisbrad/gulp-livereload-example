const gulp    = require('gulp');
const concat  = require('gulp-concat');
const plumber = require('gulp-plumber');
const notify  = require('gulp-notify');
const nodemon = require('gulp-nodemon');
const jshint  = require('gulp-jshint');
const lrPort  = 35729;

const paths = {
  assets: ['./src/assets/'],
  scripts: [
    './src/js/main.js',
    './src/**/*.js'
  ],
  html: [
    './src/html/*.html',
    './src/html/index.html'
  ],
  styles: [
    './src/css/styles.css',
    './src/css/*.css'
  ]
};

gulp.task('serve', function(){
  nodemon({'script': './server.js'});
});

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('js:lint', function(){
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify({message: 'jshint done'}));
});

gulp.task('js:build', function(){
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload())
    .pipe(notify({message: 'JS concated'}));
});

gulp.task('html:build', function(){
  return gulp.src(paths.html)
    .pipe(plumber())
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload())
    .pipe(notify({message: 'HTML pages built'}))

});

gulp.task('css:build', function(){
  return gulp.src(paths.styles)
    .pipe(plumber())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload())
    .pipe(notify({message: 'CSS done'}));
});

gulp.task('build', ['html:build', 'js:build', 'css:build']);

gulp.task('watch', function(){
  gulp.watch(paths.html, ['html:build']);
  gulp.watch(paths.scripts, ['js:lint', 'js:build']);
  gulp.watch(paths.styles, ['css:build']);
});

gulp.task('default', ['build', 'connect', 'serve', 'watch']);