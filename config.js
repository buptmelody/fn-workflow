module.exports = {
	"projectName": "fn-workflow",
	"paths": {
		src: {
			dir: './src',
			img: './src/img/**/*.{JPG,jpg,png,gif,svg}',
			slice: './src/slice/**/*.png',
			js: './src/js/**/*.js',
			media: './src/media/**/*',
			less: './src/css/style-*.less',
			lessAll: './src/css/**/*.less',
			sass: './src/css/style-*.scss',
			sassAll: './src/css/**/*.scss',
			html: ['./src/html/**/*.html', '!./src/html/_*/**.html', '!./src/html/_*/**/**.html'],
			htmlAll: './src/html/**/*.html'
		},
		dev: {
			dir: './dev',
			css: './dev/css',
			html: './dev/html',
			js: './dev/js'
		}
	},
	"livereload": {
		"available": true,
		//开启自动刷新
		"port": 8080,
		"startPath": "html/TmTIndex.html"
	},
	//路径相对于 workflow/lib 目录
	"plugins": {
		"build_devAfter": [
			"TmTIndex"
		],
		"build_distAfter": []
	},
    //gulp-lazyImageCSS 寻找目录(https://github.com/weixin/gulp-lazyimagecss)
	"lazyDir": [
		"../slice"
	],

	"supportWebp": false,
	"supportREM": true,
	"supportChanged": false,
	"reversion": true
}

