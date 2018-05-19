const fs = require('fs');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const synchronize = require('gulp-sync-dir');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const gutil = require('gulp-util');
const argv = require('yargs').argv;

const SCSS_BASE_PATH = 'src/scss';
const IMG_BASE_PATH = 'src/assets/img';
const ES6_BASE_PATH = 'src/appui';

gulp.task('copyserver', () => {
  return gulp.src('src/*.js').pipe(gulp.dest('./dist'));
});

gulp.task('copyserver:watch', () => {
  return gulp.watch('src/*.js', ['copyserver']);
});

gulp.task('copymustache', () => {
  return gulp.src('src/views/*').pipe(gulp.dest('./dist/views'));
});

gulp.task('copymustache:watch', () => {
  return gulp.watch('src/views/*', ['copymustache']);
});

// transpile es6 to js
gulp.task('babel', () => {
  return gulp
    .src(`${ES6_BASE_PATH}/**/*.js`)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./static/script/appui'));
});

// transpile es6 to js
gulp.task('babel:dev', () => {
  return gulp
    .src(`${ES6_BASE_PATH}/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', function(err) {
      gutil.log(
        gutil.colors.red('[ babel:dev error ]\n') +
          err.fileName +
          (err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : `:`) +
          '\n\n' +
          err.codeFrame +
          '\n'
      );
      this.emit('end');
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/static/script/appui'));
});

gulp.task('babel:watch', () => {
  gulp.watch(`${ES6_BASE_PATH}/**/*.js`, ['babel:dev']);
});

// tasks for base css
gulp.task('sass-base', () => {
  return gulp
    .src(`${SCSS_BASE_PATH}/base/base.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/static/style'));
});

gulp.task('sass-base:watch', () => {
  gulp.watch(`${SCSS_BASE_PATH}/base/**/*.scss`, ['sass-base']);
});

// tasks for base css
gulp.task('sass-base', () => {
  return gulp
    .src(`${SCSS_BASE_PATH}/base/base.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/static/style'));
});

gulp.task('sass-base:watch', () => {
  gulp.watch(`${SCSS_BASE_PATH}/base/**/*.scss`, ['sass-base']);
});

// tasks for 540p css
gulp.task('sass-540', () => {
  return gulp
    .src(`${SCSS_BASE_PATH}/540p/540p.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/static/style/layouts'));
});

gulp.task('sass-540:watch', () => {
  gulp.watch(`${SCSS_BASE_PATH}/540p/**/*.scss`, ['sass-540']);
});

// tasks for 720p css
gulp.task('sass-720', () =>
  gulp
    .src(`${SCSS_BASE_PATH}/720p/720p.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/static/style/layouts'))
);

gulp.task('sass-720:watch', () => {
  gulp.watch(`${SCSS_BASE_PATH}/720p/**/*.scss`, ['sass-720']);
});

// tasks for 1080p css
gulp.task('sass-1080', () => {
  return gulp
    .src(`${SCSS_BASE_PATH}/1080p/1080p.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/static/style/layouts'));
});

gulp.task('sass-1080:watch', () => {
  gulp.watch(`${SCSS_BASE_PATH}/1080p/**/*.scss`, ['sass-1080']);
});

// copy images to destination folder
gulp.task('images:copy', () =>
  gulp
    .src(`${IMG_BASE_PATH}/**`)
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/static/img'))
);

gulp.task('images:sync', function() {
  synchronize({
    src: IMG_BASE_PATH,
    target: './dist/static/img'
  });
});

gulp.task('images:watch', function() {
  gulp.watch(`${IMG_BASE_PATH}/**/*`, ['images-copy', 'images-sync']);
});

gulp.task('static', [
  'copyserver',
  'copymustache',
  'sass-base',
  'sass-540',
  'sass-720',
  'sass-1080',
  'images:copy',
  'images:sync'
]);

gulp.task('watch', [
  'copyserver:watch',
  'copymustache:watch',
  'babel:watch',
  'sass-base:watch',
  'sass-540:watch',
  'sass-720:watch',
  'sass-1080:watch',
  'images:watch'
]);

gulp.task('prod', ['babel', 'static']);
gulp.task('dev', ['babel:dev', 'static', 'watch']);

gulp.task('build:prod', ['prod', 'config:prod']);
gulp.task('build:dev', ['prod', 'config:dev']);
