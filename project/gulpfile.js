'use strict';

//require
var gulp = require('gulp');

var gulpLess = require('gulp-less');//less预处理
var uglify = require('gulp-uglify');//压缩js文件
var minifyCss = require('gulp-clean-css');//压缩css
var del = require('del');//删除

var license = require('gulp-licenser');
var mainBowerFiles = require('main-bower-files');
var plumber = require('gulp-plumber');//防止编译出错即停止

var lib = 'lib/';
var src = 'src/';
var dst = 'dist/';

var LICENSE_TEMPLATE =
    '/**\n\
    * @author: \n\
    *    wiseman\n\
    * @version: \n\
    *    v0.0.1\n\
    * @license:\n\
    *    Copyright 2016, 上海海翼知信息科技有限公司. All rights reserved.\n\
    */';

gulp.task('cleanCss', function(cb)  {//定义名为cleanCss的任务删除css
    return del([dst + '**/*.css',src + 'css/*.css'],cb);//删除dist文件夹下的所有js文件
});
gulp.task('cleanJs', function (cb) {//删除dist文件夹下所有的js文件
    return del(dst + '**/*.js',cb);
});
gulp.task('uglify-js', function () {//通过js(首先删除js文件)
    return gulp.src(src + 'js/*.js')
        .pipe(uglify())//通过UglifyJs来压缩js文件
        .pipe(gulp.dest(dst + 'js'));//将经过的插件处理的文件流通过pipe方法导入到gulp.dest()中
});

gulp.task('minify-css', ['less'], function () {  //压缩css（首先删除css文件，将less编译成css文件）
    return gulp.src(src + 'css/*.css')
        .pipe(minifyCss())  //压缩css
        .pipe(gulp.dest(dst + 'css'));
});
gulp.task('less', function () {  //定义名为less的任务
    return gulp.src(src + 'less/*.less')
        .pipe(plumber())
        .pipe(gulpLess())    //将less预处理为css
        .pipe(gulp.dest(src + 'css'));  //最后生成的文件路径为src/css/*.less
});

gulp.task('main-bower-file', function () {
    return gulp.src(mainBowerFiles({
       'overrides': {
           'jquery': {
               'main':[
                   'dist/jquery.min.js'
               ]
           },
           'echarts':{
               'main':[
                   'dist/echarts.min.js'
               ]
           },
           'hieknjs':{
               'main':[
                   'dist/jquery.hieknjs.min,js',
                   'dist/jquery.hieknjs.min,css'
               ]
           },
           'bootstrap':{
               'main':[
                   'dist/js/bootstrap.min,js',
                   'dist/css/bootstrap.min,css'
               ]
           },
           'font-awesome':{
               'main':[
                   'fonts/*',
                   'css/font-awesome.min.css'
               ]
           },
           'material-design-icons':{
               'main':[
                   'iconfont/MaterialIcons-Regular.*',
                   'iconfont/material-icons.css'
               ]
           },
           'moment':{
               'main':[
                   'min/moment.min.js'
               ]
           },
           'jquery.showLoading':{
               'main':[
                   'js/jquery.showLoading.min.js'
               ]
           },
           'toastr':{
               'main':[
                   'toastr.min.css',
                   'toastr.min.js'
               ]
           },
           'lodash':{
               'main':[
                   'dist/lodash.min.js'
               ]
           },
           'jquery.cookie':{
               'main':[
                   'jquery.cookie.js'
               ]
           },
           'nice-validator':{
               'main':[
                   'dist/jquery.validator.min.js',
                   'dist/jquery.validator.css'
               ]
           },
           'jquery-ui':{
               'main':[
                   'jquery-ui.min.js',
                   'themes/dark-hive/jquery-ui.min.css'
               ]
           },
           'blueimp-file-upload':{
               'main':[
                   'js/jquery.iframe-transport.js',
                   'js/jquery.fileupload.js'
               ]
           }
       } 
    }))
        .pipe(gulp.dest(lib));
});


gulp.task('lib',['main-bower-file'],function () {
    return gulp.src([lib +'FontAwesome.otf',lib + 'fontawesome-webfont',lib + 'MaterialIcons-Regular.*',lib + 'material-icons.css'])
        .pipe(gulp.dest('fonts/'));
});

gulp.task('watch',function () {//定义名为watchless的任务
    gulp.watch(src + '**/*.less',['minify-css']);//监听改目录下less文件的变化
    gulp.watch(src + '**/*.js',['uglify-js']);//监听该目录下js文件的变化
});

gulp.task('default',['uglify-js','minify-css','lib']);//定义名为default的任务,默认任务