/**
 * Created by wangdanting on 16/11/22.
 */

const gulp = require('gulp');
const del = require('del');

//less autoprefix
const lessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new lessAutoprefix({browsers: ['last 2 versions']});

//load gulp plugins
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins({
    scope: ['devDependencies'],
    rename: {
        'gulp-clean-css': 'cleanCSS',
        'gulp-minify-html': 'minifyHTML',
        'gulp-rev-replace': 'revReplace',
        'gulp-rev-css-url': 'revCSSURL'
    }
});

//生产环境
var isProduction = process.env.NODE_ENV !== 'dev';

//合并文件
const CSS_FILENAME = 'app.css';
const JS_FILENAME = 'app.js';

//目录配置
var  paths = {
    html: 'src/**/*.html',
    js: 'src/**/*.js',
    css: 'src/**/*.css',
    template: ['src/**/*.html'],
    less: 'src/**/*.less',
    image: {
        gif: 'src/**/*.gif',
        jpg: 'src/**/*.jpg',
        png: 'src/**/*.png'
    },
    font: {
        woff: 'src/**/*.woff',
        eot: 'src/**/*.eot',
        svg: 'src/**/*.svg',
        ttf: 'src/**/*.ttf'
    },
    dist: 'dist'
};


//task clean
gulp.task('clean', function(callback) {
    var distPath = 'dist/**/*';
    return del(distPath, callback);
});


gulp.task('build-assets', ['clean'], function() {
    var jsFilter = plugins.filter(['**/*.js'], {
        restore: true
    });
    var cssFilter = plugins.filter(['**/*.css'], {
        restore: true
    });
    var lessFilter = plugins.filter(['**/*.less'], {
        restore: true
    });
    var imageFilter = plugins.filter(['**/*.gif', '**/*.jpg', '**/*.png'], {
        restore: true
    });

    var srcPaths = [
        paths.js,
        paths.css,
        paths.less,
        paths.image.gif,
        paths.image.jpg,
        paths.image.png,
        paths.font.woff,
        paths.font.eot,
        paths.font.svg,
        paths.font.ttf
    ];

    return gulp.src(srcPaths)
         .pipe(plugins.plumber({errorHandler: plugins.notify.onError("错了。。")}))
        // .pipe(plugins.notify("hello time"))
        .pipe(plugins.flatten())    //remove or replace relative path for files

        .pipe(lessFilter)   //less
        .pipe(plugins.less())
        .pipe(lessFilter.restore)

        .pipe(cssFilter)    //minify css
        .pipe(plugins.concat(CSS_FILENAME))
        .pipe(plugins.less({plugins: [autoprefix]}))    //prefix
        .pipe(plugins.cleanCSS())
        .pipe(cssFilter.restore)

        .pipe(jsFilter) //minify js
        .pipe(plugins.concat(JS_FILENAME))
        .pipe(plugins.if(isProduction, plugins.uglify()))   //gulp-if
        .pipe(jsFilter.restore)

        .pipe(imageFilter)  //minify image
        .pipe(plugins.if(isProduction, plugins.imagemin({
            progressive: true,  //Lossless conversion to progressive
            interlaced: true    //interlace gif for progressive rendering
        })))
        .pipe(imageFilter.restore)

        .pipe(plugins.rev())    //appending hash
        .pipe(plugins.rename(function(path) {   //rename to hash
            path.basename = path.basename.replace(/[\w\.]+-/g, '');
            return path;
        }))

        .pipe(plugins.revCSSURL())  //the lightweight plugin to override urls in css files to hashed after gulp-rev
        .pipe(gulp.dest(paths.dist))    //dest

        .pipe(plugins.rev.manifest())   //rev manifest
        .pipe(gulp.dest('./'));

});

//task build
gulp.task('build', ['build-assets'], function() {
    var manifestFile = gulp.src('./rev-manifest.json');

    return gulp.src(paths.html)
        .pipe(plugins.revReplace({  //rewrite occurences of filenames which have been renamed by gulp-rev
            manifest: manifestFile,
            prefix: 'dist/'         //default prefix
        }))
        .pipe(plugins.flatten())
        .pipe(plugins.minifyHTML({
            empty: true,    //do not remove empty attributes
            spare: true,    //do not remove redundant attributes
            quotes: true,   //do not remove arbitrary quotes
            conditionals: true  //do not remove conditional internet explorer comments
        }))
        .pipe(gulp.dest('./'))
});

//task watch
gulp.task('watch', function() {
    gulp.watch(paths.js, ['build']);
    gulp.watch(paths.css, ['build']);
    gulp.watch(paths.less, ['build']);
    gulp.watch(paths.html, ['build-assets']);
});

//task dev
gulp.task('default', ['build', 'watch']);

//task release
gulp.task('release', ['build']);



