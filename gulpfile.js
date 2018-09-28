var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');


var paths = {
    fonts: ['fonts/*'],
    js: ['js/*.js'],
    html:['*.html'],
    sass:['sass/*'],
    img:['img/*.{png,jpg,jpeg,gif,svg}']
}

//////////////////////////
//SASS
//////////////////////////
gulp.task('sass', function() {
    return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}));
});

////////////////////////////
//JS
////////////////////////////
gulp.task('js', function() {
    return gulp.src(paths.js)
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

////////////////////////////
//FONTS
////////////////////////////
gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
    .pipe(gulp.dest('build/fonts'))
    .pipe(browserSync.reload({stream: true}));
});

////////////////////////////
//HTML
////////////////////////////
gulp.task('html', function() {
    return gulp.src(paths.html)
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}));
});

//////////////////////////////
//IMG
//////////////////////////////
gulp.task('img', function() {
    return gulp.src(paths.img)
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

///////////////////////////////
//BROWSERSYNC
///////////////////////////////
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        },
        port: 8000,
        ghostMode: false,
        open: true,
        notify: false
    });
});

///////////////////////////////
//WATCHER
///////////////////////////////
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.img, ['img']);
});

gulp.task('default', ['sass', 'js', 'html', 'img', 'fonts', 'watch', 'browserSync']);
gulp.task('build', ['sass', 'js', 'html', 'img', 'fonts']);