var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['./sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['scripts/**/*.js', '!scripts/libs/**/*.js'])
        .pipe(gulp.dest("./asset/js/"))
        .pipe(browserSync.stream());
});

var siteName = 'hpl'; // set your siteName here
var userName = 'garytietjen'; // set your macOS userName here


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        proxy: 'https://' + siteName + '.test',
        host: siteName + '.test',
        open: 'external',
        port: 8006,
        https: {
            key:
                '/Users/' +
                userName +
                '/.config/valet/Certificates/' +
                siteName +
                '.test.key',
            cert:
                '/Users/' +
                userName +
                '/.config/valet/Certificates/' +
                siteName +
                '.test.crt'
        }
    });

    // gulp.watch('**/*.php').on('change', function(file) {
    //       server.changed(file.path);
    //       util.log(util.colors.yellow('PHP file changed' + ' (' + file.path + ')'));
    //   });

    gulp.watch("**/*.php").on('change', browserSync.reload);
    gulp.watch("**/*.js").on('change', browserSync.reload);
    gulp.watch(['./sass/**/*.scss'], gulp.series('sass'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('js','serve'));