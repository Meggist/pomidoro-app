const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    eslint = require('gulp-eslint'),
    gulpIf = require('gulp-if')

function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
}

const defaultTask = () => {
    gulp.src('./app/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))


    return  gulp.src(['./app/js/storage.js',
        './app/js/save.js', './app/js/get.js',
        './app/js/getAll.js'])
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(gulpIf(isFixed,
            concat('bundle.js'),uglify(),
            gulp.dest('./dist/js')))
        .pipe(eslint.failAfterError())
}

exports.default = defaultTask
