// 
//  Required
//
var gulp = require('gulp'),
    less = require('gulp-less'),
	path = require('path'),
	plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    del = require('del'),
    nodeModules = "node_modules/"
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

//	get scripts
gulp.task('get-scripts', function(){
	gulp.src([nodeModules + 'jquery/dist/jquery.min.js', nodeModules + 'bootstrap-less/js/bootstrap.min.js', nodeModules + 'angular/angular.js'])
	.pipe(plumber())
	.pipe(gulp.dest('app/scripts'))
})

//	make scripts ready for build
gulp.task('scripts', ['get-scripts'], function(){
	gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
	.pipe(plumber())
	.pipe(gulp.dest('app/scripts'));
});

//
//	Bootstrap fonts
//
gulp.task('fonts', function(){
	gulp.src([nodeModules + '/bootstrap-less/fonts/**/*'])
	.pipe(gulp.dest('app/fonts'));
});
//
//	LESS Task
//
gulp.task('less', ['fonts'], function(){
	gulp.src(['app/less/**/*.less'])
	.pipe(plumber())
	.pipe(less({
		paths: [
		'.',
		'./node_modules/bootstrap-less'
		]
	}))
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
	del(['build/**'], cb());
});

// Task to create build directory for all files
gulp.task('build:copy', ['build:cleanfolder'], function(cb) {
	return gulp.src('app/**/*/')
	.pipe(gulp.dest('build/')), cb();
});

// task to remove unwanted files from the build folder
// list all files and directories here that you don't want

gulp.task('build:remove', ['build:copy'], function(cb) {
	del([
			'build/js/',
			'build/less/'
		], cb());
});

//	Build app
gulp.task('build', ['build:copy', 'build:remove']);

gulp.task('build:serve', ['build:copy', 'build:remove'], function(){
	browserSync({
		server:{
			baseDir: "./build"
		}
	})
});
