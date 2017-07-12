const gulp        = require('gulp');
const handlebars  = require('gulp-compile-handlebars');
const browserify  = require('browserify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const uglify      = require('gulp-uglify');
const sourcemaps  = require('gulp-sourcemaps');
const livereload  = require('gulp-livereload');
const connect     = require('gulp-connect');
const rename      = require('gulp-rename');
const sass        = require('gulp-sass');
const concat      = require('gulp-concat');
const PORT        = 1234;
const ROOT        = './build';

const Tasks = Object.freeze({
  BUILD:   'build',
  CONNECT: 'connect',
  DEFAULT: 'default',
  IMAGES:  'images',
  FONTS:   'fonts',
  SCRIPTS: 'scripts',
  STYLES:  'styles',
  WATCH:   'watch'
});

const Paths = Object.freeze({
  SRC: './index.js',
  SOURCE: './index.js',
  DIST: './build',
  DIST_MAIN: '.',
  MAPS: './maps',
  SCRIPTS: './src/**/*.js',
  STYLES: [
    'assets/styles/*.scss',
    'assets/styles/**/*.scss',
    'src/components/**/*.scss',
  ],
  STYLE_DIST: 'assets/style.css',
  PARTIALS_DIR: './src/components',
  PARTIALS: './src/components/**/*.hbs',
  MAIN_FILE: 'index.hbs',
  STYLE_FILES: [
    './node_modules/leaflet/dist/*.css',
    'assets/styles/dependencies/*.css',
    'assets/styles/main.scss'
  ],
  DIST_FILE: './build/index.html',
  IMAGES: [
    'node_modules/leaflet/dist/images/*.png'
  ],
  IMAGES_DIST: './build/assets/images',
  FONTS: [
    './assets/styles/fonts/**/*.ttf'
  ],
  FONTS_DIST: './build/fonts/'
});

const BabelConfig = Object.freeze({
  only: /^(?:.*\/node_modules\/(?:a|b)\/|(?!.*\/node_modules\/)).*$/,
  presets: ['es2015'],
  plugins: ['transform-object-rest-spread'],
  global: true
});

const BrowserifyConfig = Object.freeze({
  entries: Paths.SRC,
  debug: true
});

const Transforms = Object.freeze({
  BABELIFY: 'babelify'
});

gulp.task(Tasks.BUILD, function () {
  const data = {
    title: 'Carto Map Widget'
  };

  const options = {
    batch: [ Paths.PARTIALS_DIR ]
  };

  return gulp.src(Paths.MAIN_FILE)
    .pipe(handlebars(data, options))
    .pipe(rename(Paths.DIST_FILE))
    .pipe(gulp.dest(Paths.DIST_MAIN));
});

gulp.task(Tasks.SCRIPTS, function () {
    return browserify(BrowserifyConfig)
      .transform(Transforms.BABELIFY, BabelConfig)
      .bundle()
      .pipe(source(Paths.SOURCE))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write(Paths.MAPS))
      .pipe(gulp.dest(Paths.DIST));
});

gulp.task(Tasks.STYLES, function() {
  return gulp.src(Paths.STYLE_FILES)
  .pipe(sass())
  .pipe(concat(Paths.STYLE_DIST))
  .pipe(gulp.dest(Paths.DIST));
});

gulp.task(Tasks.IMAGES, function() {
  return gulp.src(Paths.IMAGES)
  .pipe(gulp.dest(Paths.IMAGES_DIST));
});

gulp.task(Tasks.FONTS, function() {
  return gulp.src(Paths.FONTS)
  .pipe(gulp.dest(Paths.FONTS_DIST));
});

gulp.task(Tasks.WATCH, [ Tasks.BUILD ], function () {
    livereload.listen();
    gulp.watch(
      [
        Paths.SOURCE,
        Paths.SCRIPTS,
        Paths.STYLES,
        Paths.PARTIALS,
        Paths.MAIN_FILE
      ],[
        Tasks.BUILD,
        Tasks.SCRIPTS,
        Tasks.STYLES
      ]
    );
});

gulp.task(Tasks.CONNECT, function() {
  connect.server({
    root: ROOT,
    port: PORT
  });
});

gulp.task(Tasks.DEFAULT, [
  Tasks.CONNECT,
  Tasks.BUILD,
  Tasks.IMAGES,
  Tasks.FONTS,
  Tasks.SCRIPTS,
  Tasks.STYLES,
  Tasks.WATCH
]);
