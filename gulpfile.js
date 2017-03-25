'use strict';

var config = {},
    gulp = require('gulp'),
    path = require('path'),
    fs = require('fs');

var propertiesReader = require('properties-reader');


var $ = require('gulp-load-plugins')({
    pattern: [
        'del',
        'gulp-*',
        'main-bower-files',
    ]
});

config.buildDir = "stubs-ui/";
gulp.task('bowerCopy', function () {
    var cssFilter = $.filter('**/*.css', {
            restore: true
        }),
        jsFilter = $.filter('**/*.js', {
            restore: true
        });

    return gulp.src($.mainBowerFiles({
            overrides: {
                'bootstrap': {
                    main: ["dist/css/bootstrap.css",
                        "dist/js/bootstrap.js"
                    ]
                }
            },
        }))
        .pipe(cssFilter)
        .pipe($.concat('vendor.css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(config.buildDir))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe($.concat('vendor.js'))
        .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
        }))
        .pipe(gulp.dest(config.buildDir))
        .pipe(jsFilter.restore);
});

gulp.task('static', function () {
    gulp.src('stubs-ui/libs/jsoneditor/dist/img/*')
        .pipe(gulp.dest(config.buildDir + "img"));
});

gulp.task('default', ['bowerCopy']);