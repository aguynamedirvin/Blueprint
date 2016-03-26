/**
    Load our Gulp plugins
**/
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
var notify = require('gulp-notify');



/**
    Watch our files for changes
    https://github.com/gruntjs/grunt-contrib-watch
**/
gulp.task('default', function() {
	gulp.watch('js/src/**/*.js', ['js']);
	gulp.watch('css/src/**/*.sass', ['sass']);
	gulp.watch('html/**/*.html', ['html']);
	gulp.watch('images/src/**/*', ['image']);
});



Dev:
    CSS:
        sass, autoprefixer, cmq, rem, minify
    JS:
        uglify
    Images:
        imagemin


gulp.task('sass', function() {
	gulp.src(['css/src/**/*.sass'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(autoPrefixer())
		.pipe(cssComb())
		.pipe(cmq({log:true}))
		.pipe(gulp.dest('css/dist'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifyCss())
		.pipe(gulp.dest('css/dist'))
		.pipe(notify('css task finished'))
});
gulp.task('js',function(){
	gulp.src(['js/src/**/*.js'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('js/dist'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('js/dist'))
  		.pipe(notify('js task finished'))
});
gulp.task('html',function(){
	gulp.src(['html/**/*.html'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('./'))
		.pipe(notify('html task finished'))
});
gulp.task('image',function(){
	gulp.src(['images/src/**/*'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(cache(imageMin()))
		.pipe(gulp.dest('images/dist'))
		.pipe(notify('image task finished'))
});
gulp.task('default',function(){
	gulp.watch('js/src/**/*.js',['js']);
	gulp.watch('css/src/**/*.sass',['sass']);
	gulp.watch('html/**/*.html',['html']);
	gulp.watch('images/src/**/*',['image']);
});
