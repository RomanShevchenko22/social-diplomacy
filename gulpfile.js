const gulp = require('gulp');

const htmlmin = require('gulp-htmlmin');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const pimport = require('postcss-import');
const minmax = require('postcss-media-minmax');
const csso = require('postcss-csso');

const babel = require('gulp-babel');
const terser = require('gulp-terser');

const del = require('del');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const sync = require('browser-sync');

//----------------------------------------------- Del
const deleteFiles = () => {
    return del('build');
};
exports.del = del;

//----------------------------------------------- HTML
const htmlProd = () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('build'))
        .pipe(sync.stream());
};
exports.htmlProd = htmlProd;

const htmlDev = () => {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(sync.stream());
};
exports.htmlDev = htmlDev;

//----------------------------------------------- Styles
const stylesProd = () => {
    return gulp.src('src/sass/style.scss')
        .pipe(sass())
        .pipe(postcss([
            pimport,
            minmax,
            autoprefixer,
            csso,
        ]))
        .pipe(replace(/\.\.\//g, ''))
        .pipe(gulp.dest('build'))
        .pipe(sync.stream());
};
exports.scriptsProd = stylesProd;

const stylesDev = () => {
    return gulp.src('src/sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init()) 
        .pipe(sass())
        .pipe(postcss([
            pimport,
            autoprefixer,
        ]))
        .pipe(sourcemaps.write("./"))
        .pipe(replace(/\.\.\//g, ''))
        .pipe(gulp.dest('build'))
        .pipe(sync.stream());
};
exports.stylesDev = stylesDev;

//----------------------------------------------- Scripts
const scriptsProd = () => {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('build'))
        .pipe(sync.stream());
};
exports.scriptsProd = scriptsProd;

const scriptsDev = () => {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('bundle.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest('build'))
        .pipe(sync.stream());
};
exports.scriptsDev = scriptsDev;

//------------------------------------------------ Copy
const copy = () => {
    return gulp.src([
            'src/fonts/**/*',
            'src/images/**/*',
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('build'))
        .pipe(sync.stream({
            once: true
        }));
};
exports.copy = copy;

//------------------------------------------------ Paths
const paths = () => {
    return gulp.src('build/*.html')
        .pipe(replace(
            /(<link rel="stylesheet" href=")styles\/(style.css">)/, '$1$2'
        ))
        .pipe(replace(
            /(<script src=")scripts\/(bundle.js">)/, '$1$2'
        ))
        .pipe(gulp.dest('build'));
};
exports.paths = paths;

//----------------------------------------------- Server
const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'build'
        }
    });
};
exports.server = server;

//----------------------------------------------- Watch
const watch = () => {
    gulp.watch('src/*.html', gulp.series(htmlDev, paths));
    gulp.watch('src/sass/**/*.scss', gulp.series(stylesDev));
    gulp.watch('src/scripts/**/*.js', gulp.series(scriptsDev));
    gulp.watch([
        'src/fonts/**/*',
        'src/images/**/*',
    ], gulp.series(copy));
};
exports.watch = watch;

//----------------------------------------------- Dev
exports.dev = gulp.series(
    deleteFiles,
    gulp.parallel(
        htmlDev,
        stylesDev,
        scriptsDev,
        copy,
    ),
    paths,
    gulp.parallel(
        watch,
        server,
    ),
);
//---------------------------------------------- Prod
exports.prod =  gulp.series(
    deleteFiles,
    gulp.parallel(
        htmlProd,
        stylesProd,
        scriptsProd,
        copy,
    ),
    paths,
    gulp.parallel(
        watch,
        server,
    ),
);