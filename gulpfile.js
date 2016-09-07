// 
//  Required
//
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
	path = require('path'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer')
    browserSync = require('browser-sync'),
    del = require('del')
    reload = browserSync.reload;

//
// HTML Task
//
gulp.task('html', function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});

//
//  Scripts Task
//
gulp.task('scripts', function(){
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});
//
//	LESS Task
//
gulp.task('less', function(){
	gulp.src(['app/less/**/*.less'])
	.pipe(plumber())
	.pipe(less({
		paths: [ path.join(__dirname, 'less', 'includes') ]
	}))
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('app/css'))
	.pipe(reload({stream:true}));
})

//
// Bowser Sync Task
//
gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: "./app"
		}
	})
});

//
//  Watch Task
//
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts'])
	gulp.watch('app/less/**/*.less', ['less'])
	gulp.watch('app//**/*.html', ['html'])
});

//
//  Default Task
//
gulp.task('default', ['scripts','browser-sync', 'less', 'html', 'watch']);


//
//	Build Task
//

// Clear out everything from the build folder
gulp.task('build:cleanfolder', function(cb) {
	del(['build/**']);
	cb();
});

// Task to create build directory for all files
gulp.task('build:copy', ['build:cleanfolder'], function() {
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/'));
});

// task to remove unwanted files from the build folder
// list all files and directories here that you don't want

gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
			'build/js/!(*.min.js)',
			'build/less/'
		], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);