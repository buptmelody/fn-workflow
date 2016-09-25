var fs = require('fs');
var path = require('path');
var del = require('del');
var ejs = require('gulp-ejs');
var util = require('./lib/util');
var gulpif = require('gulp-if');
var ejshelper = require('tmt-ejs-helper');
var bs = require('browser-sync').create();  // 自动刷新浏览器
var lazyImageCSS = require('gulp-lazyimagecss');  // 自动为图片样式添加 宽/高/background-size 属性
var postcss = require('gulp-postcss');   // CSS 预处理
var posthtml = require('gulp-posthtml');  // HTML 预处理
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var babel = require('gulp-babel');