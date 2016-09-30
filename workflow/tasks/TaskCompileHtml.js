// 编译html文件
var lib = require('../util/lib');
var argv = require('yargs').argv;
var ejshelper = require('tmt-ejs-helper');
var posthtmlPx2rem = require('posthtml-px2rem');

module.exports = function (gulp, common) {
    gulp.task('compile_html', function() {
        var f = common.plugins.filter('!src/m/*.html',{restore: true});

        common.plugins.util.log('开始编译html');
        return gulp.src(common.config.paths.src.html)
            .pipe(common.plugins.ejs(ejshelper()))
            .pipe(f)
            .pipe(common.plugins.if(
                common.config.supportREM,
                common.plugins.posthtml(posthtmlPx2rem({
                        rootValue: 20,
                        minPixelValue: 2
                    })
            )))
            .pipe(f.restore)
            .pipe(common.plugins.if(argv.env == 'prod',gulp.dest(common.config.paths.dist.html),gulp.dest(common.config.paths.dev.html)))
            .on('end',function(){
                lib.task_log('compile_html');
            });
    });
};
