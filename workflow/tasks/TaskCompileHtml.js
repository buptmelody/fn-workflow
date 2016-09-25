// 编译html文件
var ejshelper = require('tmt-ejs-helper');
var posthtmlPx2rem = require('posthtml-px2rem');

module.exports = function (gulp, common) {
  gulp.task('compile_html', function() {
    common.plugins.util.log('开始编译html');
    return gulp.src(common.config.paths.src.html)
        .pipe(common.plugins.ejs(ejshelper()))
        .pipe(gulpif(
            common.config.supportREM,
            common.plugins.posthtml(
                posthtmlPx2rem({
                    rootValue: 20,
                    minPixelValue: 2
                })
            ))
        )
        .pipe(gulp.dest(common.config.paths.dev.html));
  });
};