const gulp           = require('gulp');
const handlebars     = require('gulp-compile-handlebars');
const browserify     = require('browserify');
const source         = require('vinyl-source-stream');
const buffer         = require('vinyl-buffer');
const uglify         = require('gulp-uglify');
const sourcemaps     = require('gulp-sourcemaps');
const rename         = require('gulp-rename');
const sass           = require('gulp-sass');
const concat         = require('gulp-concat');
const server         = require('gulp-server-livereload');

const Tasks = Object.freeze({
  BUILD:       'build',
  DEFAULT:     'default',
  FONTS:       'fonts',
  IMAGES:      'images',
  RUN:         'run',
  SCRIPTS:     'scripts',
  SERVER:      'server',
  STYLES:      'styles',
  TEST_BUILD:  'test-build',
  TEST_SERVER: 'test-server',
  TEST_STYLE:  'test-style',
  TEST_WATCH:  'test-watch',
  TEST_MOCHA:  'test-mocha',
  TEST:        'test',
  WATCH:       'watch'
});

const Paths = Object.freeze({
  SRC: './index.js',
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
  FONTS_DIST: './build/fonts/',
  MOCHA_SRC: './node_modules/mocha/mocha.js',
  TEST_HTML: './test/index.html',
  TEST_DIR: './test',
  TEST_SCRIPTS: './test/**/**/*.spec.js',
  TEST_STYLES: ['./test/style.scss', './node_modules/mocha/mocha.css'],
  TEST_SRC: './test/test.js',
  TEST_MAPS: './test/maps',
  TEST_STYLE_DIST: 'style.css',
  TEST_DIST: 'bundle.js'
});

const BabelConfig = Object.freeze({
  only: /^(?:.*\/node_modules\/(?:a|b)\/|(?!.*\/node_modules\/)).*$/,
  presets: ['es2015'],
  plugins: ['transform-object-rest-spread'],
  global: true
});

const BabelTestConfig = Object.freeze({
  presets: ['es2015']
});

const BrowserifyConfig = Object.freeze({
  entries: Paths.SRC,
  debug: true
});

const BrowserifyTestConfig = Object.freeze({
  entries: Paths.TEST_SRC,
  debug: true
});

const Transforms = Object.freeze({
  BABELIFY: 'babelify'
});

const LivereloadConfig = Object.freeze({
  clientConsole:    true,
  directoryListing: false,
  livereload:       true,
  log:              'debug',
  open:             true,
  port:             1234
});

const LivereloadTestConfig = Object.freeze({
  clientConsole:    true,
  directoryListing: false,
  livereload:       true,
  log:              'debug',
  open:             true,
  port:             8888
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
    .pipe(source(Paths.SRC))
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

gulp.task(Tasks.TEST_STYLE, function() {
  return gulp.src(Paths.TEST_STYLES)
  .pipe(sass())
  .pipe(concat(Paths.TEST_STYLE_DIST))
  .pipe(gulp.dest(Paths.TEST_DIR));
});

gulp.task(Tasks.WATCH, [ Tasks.BUILD ], function () {
  gulp.watch(
    [
      Paths.SRC,
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

gulp.task(Tasks.SERVER, [ Tasks.DEFAULT ], function() {
  return gulp.src(Paths.DIST)
    .pipe(server(LivereloadConfig));
});

gulp.task(Tasks.DEFAULT, [
  Tasks.IMAGES,
  Tasks.FONTS,
  Tasks.SCRIPTS,
  Tasks.STYLES,
  Tasks.BUILD,
  Tasks.WATCH
]);

gulp.task(Tasks.TEST_BUILD, function () {
  return browserify(BrowserifyTestConfig)
    .transform(Transforms.BABELIFY, BabelTestConfig)
    .bundle()
    .pipe(source(Paths.TEST_SRC))
    .pipe(buffer())
    .pipe(rename(Paths.TEST_DIST))
    .pipe(gulp.dest(Paths.TEST_DIR));
});

gulp.task(Tasks.TEST_SERVER, function() {
  return gulp.src(Paths.TEST_DIR)
    .pipe(server(LivereloadTestConfig));
});

gulp.task(Tasks.TEST_MOCHA, function() {
  return gulp.src(Paths.MOCHA_SRC)
    .pipe(gulp.dest(Paths.TEST_DIR));
});

gulp.task(Tasks.TEST_WATCH, [ Tasks.TEST_BUILD ], function() {
  gulp.watch([
    Paths.SRC,
    Paths.SCRIPTS,
    Paths.MAIN_FILE,
    Paths.TEST_SRC,
    Paths.TEST_SCRIPTS
  ],[
    Tasks.TEST_BUILD
  ]);
});

gulp.task(Tasks.TEST, [ Tasks.TEST_MOCHA, Tasks.TEST_WATCH, Tasks.TEST_SERVER ]);
gulp.task(Tasks.RUN, [ Tasks.DEFAULT, Tasks.SERVER ]);
