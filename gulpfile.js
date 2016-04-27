'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');

var concatOrder = [
    'scripts/jquery.js',
    'scripts/snap.svg.js',
    'scripts/hrundel.js',
    'scripts/hrundelsvg.js',
    'scripts/index.js'
];

gulp.task('default', function () {
    return gulp.src(concatOrder)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./'));
});
