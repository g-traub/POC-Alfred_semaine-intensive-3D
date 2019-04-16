const prod = process.env.NODE_ENV === 'prod';
const { series, parallel, watch, src, dest } = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const pxtorem = require('gulp-pxtorem');
const browserSync = require('browser-sync');
const del = require('del');

const server = browserSync.create();
const clean = () => del(['dist']);

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist',
      index: "index.html"
    }
  });
  done();
}

function html(){
  return src('./src/html/*.html')
  .pipe(dest('dist/'))
}
function css() {
  return src('./src/scss/style.scss')
  .pipe(sass())
  .pipe(pxtorem({proplist:['*']}))
  .pipe(gulpif(prod,autoprefixer({
    browsers: ['last 2 versions']
})))
  .pipe(gulpif(prod,cssnano()))
  .pipe(dest('dist/css'))
}

function js() {
  return src('./src/js/main.js')
  .pipe(dest('dist/js'))
}

function assets() {
  return src(['./src/assets/fonts/*.*', './src/assets/img/*.*'])
  .pipe(dest('dist/assets'))
}

const watcher = () => watch('src/**/*.*', series(html, css, js, reload));

exports.dev = series(clean, html, css, js, assets, serve, watcher);
exports.build = series(html, css, js, assets);