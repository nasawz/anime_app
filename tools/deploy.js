/* eslint-disable */
var fs = require('fs')
var gulp = require("gulp")
var sftp = require('gulp-sftp')
var ftp = require('vinyl-ftp')
var run = require('run-sequence')

var pkg = require('../package.json')

gulp.task('deploy', function() {
    return gulp.src('dist/**')
    .pipe(sftp({
      host: '',
      port: 000,
      auth: '',
      remotePath: ''
    }))
})


run('deploy')
