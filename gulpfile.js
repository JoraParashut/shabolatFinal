var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	svgmin = require('gulp-svgmin'),
	cache = require('gulp-cache');

	

	var reload  = browserSync.reload;

gulp.task('scss', function(){
	return gulp.src('app/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
	return gulp.src(['app/libs/jquery/dist/jquery.min.js'])
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs',['scss'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(gulp.dest('app/css'));
});



gulp.task('browser-sync',[], function(){
	browserSync.init({
		server:('app')
	});
});


gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		}))
.pipe(gulp.dest('dist/img'));
});

gulp.task('svgmin',function(){
	return gulp.src('app/svg/**/*')
		.pipe(svgmin())
		.pipe(gulp.dest('dist/svg'));
})



gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('watch',['browser-sync','css-libs','scripts'], function(){
	gulp.watch('app/scss/*.scss', ['scss']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/php/*.php').on('change', function(){
		browserSync.reload();
	});
});



gulp.task('build',['img','scss','scripts','svgmin'], function(){

	var buildCss = gulp.src(['app/css/*.css'])

		.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	var buildphp = gulp.src('app/php/*.php')
		.pipe(gulp.dest('dist/php'));

});