var lib = require('../util/lib');
var argv = require('yargs').argv;
var postcssPxtorem = require('postcss-pxtorem'); // 转换 px 为 rem
var postcssAutoprefixer = require('autoprefixer');
var postcssCssgrace = require('cssgrace');
var path = require('path');
var runSequence = require('run-sequence');
var merge = require('merge2');
var postcssCsscomb = require('postcss-csscomb');

module.exports = function (gulp, common) {
    var pcStream = null;
    var mobileStream = null;
    var postcssOption = [
        postcssCsscomb(['zen']),
        postcssAutoprefixer({
            browsers: common.config["autoprefixer"][common.config.platform]
        }),
        postcssCssgrace
    ];

    gulp.task('compile_mcss', function() {
        if(common.config.cssplatform == 'sass'){
            common.plugins.util.log('开始编译scss');
        }
        if(common.config.cssplatform == 'less'){
            common.plugins.util.log('开始编译less');
        }
        if(common.config.supportREM){
            postcssOption.push(postcssPxtorem(common.config["postcssPxtorem"]));
        }
        return gulp.src(path.join(common.config.paths.src.css,'m/style-*.{scss,less}'))
            .pipe(common.plugins.plumber(lib.handleErrors))
            // .pipe(common.plugins.changed(path.join(common.config.paths.tmp.css,'m'),{extension:'.css'}))
            .pipe(common.plugins.logger({ showChange: true }))
            .pipe(common.plugins.sass())
            .on('error',common.plugins.sass.logError)
            .pipe(common.plugins.lazyimagecss({
                imagePath: common.config.lazyDir
            }))
            .pipe(common.plugins.tmtsprite({margin: 4}))
            .pipe(common.plugins.if('*.png',
                gulp.dest(common.config.paths.tmp.sprite),
                gulp.dest(path.join(common.config.paths.tmp.css,'m'))))
            .on('end',function(){
                common.plugins.util.log('mobile端样式预处理编译完成');
            })
            .pipe(common.plugins.filter(function(file){
                if(/.css$/.test(file.path))
                    return true;
                return false;
            }))
            .pipe(common.plugins.plumber(lib.handleErrors))
            .pipe(common.plugins.logger({ showChange: true }))
            .pipe(common.plugins.postcss(postcssOption))
            .pipe(gulp.dest(path.join(common.config.paths.dist.css,'m')))
            .pipe(common.plugins.cleanCss())
            .pipe(common.plugins.if(argv.env == 'prod',common.plugins.rename({ suffix: '.min' })))
            .pipe(gulp.dest(path.join(common.config.paths.dist.discss,'m')))
            .on('end',function(){
                common.plugins.util.log('mobile端样式编译完成');
                lib.reloadhandle();
            });
        lib.task_log('compile_mcss')
    });
}
