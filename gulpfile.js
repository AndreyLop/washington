var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify");

// Скрипты проекта

// All start 
gulp.task('all-js', function() {
	return gulp.src([
		'src/js/useful_functions.js',
		'src/js/common.js',
		])
	.pipe(concat('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// All end 

// Common
gulp.task('common-js', function() {
	return gulp.src([
		'src/js/useful_functions.js',
		'src/js/libs/imask.js',
		'src/js/libs/intlTelInput.js',
		'src/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// Common
// Home start
gulp.task('home-js', function() {
	return gulp.src([
		'src/js/libs/slick.min.js',
		'src/js/home.js',
		])
	.pipe(concat('home.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// Home end

// architecture start
gulp.task('architecture-js', function() {
	return gulp.src([
		'src/js/libs/slick.min.js',
		'src/js/architecture.js',
		])
	.pipe(concat('architecture.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// architecture end

// construction start
gulp.task('construction-js', function() {
	return gulp.src([
		'src/js/libs/magnific-popup.js',
		'src/js/construction.js',
		])
	.pipe(concat('construction.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// construction end

// day in washington start
gulp.task('day-in-washington-js', function() {
	return gulp.src([
		'src/js/libs/slick.min.js',
		'src/js/day-in-washington.js',
		])
	.pipe(concat('day-in-washington.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// day in washington end

// architecture start
gulp.task('developer-js', function() {
	return gulp.src([
		'src/js/libs/slick.min.js',
		'src/js/developer.js',
		])
	.pipe(concat('developer.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// architecture end

// news open start
gulp.task('news-open-js', function() {
	return gulp.src([
		'src/js/libs/slick.min.js',
		'src/js/news-open.js',
		])
	.pipe(concat('news-open.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// news open end

// location start
gulp.task('location-js', function() {
	return gulp.src([
		'src/js/location.js',
		])
	.pipe(concat('location.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// location end


// values start
gulp.task('values-js', function() {
	return gulp.src([
		'src/js/values.js',
		])
	.pipe(concat('values.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});
// values end

gulp.task('js', [
	'common-js',
	'home-js',
	'architecture-js',
	'construction-js',
	'day-in-washington-js',
	'developer-js',
	'news-open-js',
	'location-js',
	'values-js'], function() {
	return gulp.src([
		'src/js/common.js',
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		//proxy: "http://localhost:80/washington/dist",
		proxy: "washington/dist",
    	notify: false // Отключаем уведомления
	});
});

gulp.task('sass', function() {
	return gulp.src(['src/sass/**/*.sass', 'src/sass/**/*.scss'])
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch(['libs/**/*.js', 'src/**/*.js'], ['js']);
	gulp.watch('dist/**/*.php', browserSync.reload);
	gulp.watch('dist/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'src/*.html',
		'src/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'src/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'src/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'src/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

/*gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});*/

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
