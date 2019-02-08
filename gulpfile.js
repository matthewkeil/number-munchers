const { src, dest, series } = require('gulp');
const clean = require('gulp-clean')
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const copy = require('gulp-copy');

const assets = ['src/style.css', 'src/*.png', 'src/index.html'];


function empty() {
    return src('dist/*', {read: false})
        .pipe(clean({allowEmpty: true}));
}

function copyAssets() {
    return src(assets, {allowEmpty: true})
        .pipe(copy('dist'))
}

function js() {
  return src('src/*.js', { sourcemaps: false })
    .pipe(concat('script.js'))
    .pipe(minify({mangle: true}))
    .pipe(dest('dist/src', { sourcemaps: false }))
}

exports.default = series(empty, copyAssets, js);