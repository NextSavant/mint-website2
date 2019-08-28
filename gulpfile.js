"use strict";

var gulp = require('gulp'),
	  concat = require('gulp-concat'),
	  uglify = require('gulp-uglify'),
	  rename = require('gulp-rename'),
	  sass = require('gulp-sass'),
	  maps = require('gulp-sourcemaps'),
	  del = require('del'),
	  autoprefixer = require('gulp-autoprefixer'),
	  browserSync = require('browser-sync').create(),
	  htmlreplace = require('gulp-html-replace'),
		cssmin = require('gulp-cssmin')
		;

		
gulp.task('compile-sass', function() {
	return gulp.src([
		"assets/scss/main.scss"
	])
	.pipe(maps.init())
	.pipe(sass({includePaths:["./node_modules"]}).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.stream());
});

gulp.task("concat-scripts", function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',
		// 'node_modules/popper.js/dist/umd/popper.js',
		// 'node_modules/bootstap/dist/js/bootstrap.js',
		'node_modules/aos/dist/aos.js',
		'node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
		'assets/js/functions.js',
	])
	.pipe(maps.init())
	.pipe(concat('main.js'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('assets/js'))
	.pipe(browserSync.stream());

});

gulp.task('watchFiles', function() {
	gulp.watch('assets/scss/**/*.scss', ['compile-sass', ]);
	gulp.watch('assets/js/*.js', ['concat-scripts', ]);
})

gulp.task('serve', ['compile-sass', 'concat-scripts', 'watchFiles'], function(){
  browserSync.init({
  	server: "./"
  });

	gulp.watch("assets/scss/**/*.scss", ['watchFiles']);
	gulp.watch('assets/css/**/*.css').on('change', browserSync.reload);
  gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
});

gulp.task("minifyScripts", ["concat-scripts"], function() {
	return gulp.src("assets/js/main.js")
		.pipe(uglify().on('error', function (err) {
			console.log(err)
		}))
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('dist/assets/js'));
});

gulp.task("minifyCss", ["compile-sass"], function() {
  return gulp.src("assets/css/main.css")
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/assets/css'));
});


gulp.task('clean', function() {
  del(['dist', 'assets/css/main*.css*', 'assets/js/main*.js*']);
});


gulp.task("build", ['minifyScripts', 'minifyCss'], function() {
	return gulp.src([
		'*.html',
		'*.php',
		'favicon.ico',
		"assets/img/**",
		"assets/svg/**",
	], { base: './'})
	.pipe(gulp.dest('dist'));
});

gulp.task('renameSources', function() {
	return gulp.src(['*.html', '**/*.php', '!dist', '!dist/**'])
		.pipe(htmlreplace({
			'js': 'assets/js/main.min.js',
			'css': 'assets/css/main.min.css'
		}))
		.pipe(gulp.dest('dist/'));
});


gulp.task("default", ["clean", 'build'], function() {
  gulp.start('renameSources');
});
