'use strict'; //Required for gulp

var gulp = require('gulp'),
gulpConcat = require('gulp-concat'), //Javascript concatenations
gulpUglify = require('gulp-uglify'), //Javascript uglifier
gulpRename = require('gulp-rename'), // Rename gup plugin
gulpSass = require('gulp-sass'), //Complile sass
gulpSourcemaps = require('gulp-sourcemaps'),
gulpUglifycss = require('gulp-uglifycss'), // Uglify CSS
gulpMainBowerFiles = require('main-bower-files')
;
const del = require('del');




/*  =============  CONCATENATING VENDORS JS FILEs  =============  */
gulp.task('jsVendorsConcat',function(){
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/device.js/lib/device.js',
    'bower_components/tether/dist/js/tether.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'
])
.pipe(gulpSourcemaps.init()) //Creating Sourcemaps
.pipe(gulpConcat('vendors.js'))
.pipe(gulpSourcemaps.write('./')) // Sourcemaps Path
.pipe(gulp.dest('dist/js'));
});

/*  =============  UGLIFY VENDORS JS FILEs  =============  */
gulp.task('jsVendorsUglify',['jsVendorsConcat'],function(){
  gulp.src([
    'dist/js/vendors.js'
])
.pipe(gulpUglify())
.pipe(gulpRename('vendors.min.js')) //Rename method used to have the vendors.min.js
.pipe(gulp.dest('dist/js'));
});

/* Clean app js */
gulp.task('cleanApp',function(cb){
  return del(['dist/js/app*.*js','app.js.map'],cb);
});

/*  =============  CONCATENATING APP JS FILEs  =============  */
gulp.task('jsAppConcat', ['cleanApp'], function(){
  return gulp.src([
    'js/app.js'
])
.pipe(gulpSourcemaps.init()) //Creating Sourcemaps
.pipe(gulpConcat('app.js'))
.pipe(gulpSourcemaps.write('./')) //Sourcemaps path
.pipe(gulp.dest('dist/js'));
});

/*  =============  UGLIFY APP JS FILEs  =============  */
gulp.task('jsAppUglify',['jsAppConcat'],function(){
  gulp.src([
    'dist/js/app.js'
])
.pipe(gulpUglify())
.pipe(gulpRename('app.min.js')) //Rename method used to have the vendors.min.js
.pipe(gulp.dest('dist/js'));
});

/*  =============  COMPILING VENDORS CSS  =============  */
gulp.task('cssVendorsConcat',function(){
  return gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/tether/dist/css/tether.css'
  ])
  .pipe(gulpSourcemaps.init()) //Creating Sourcemaps
  .pipe(gulpConcat('vendors.css'))
  .pipe(gulpSourcemaps.write('./')) // Sourcemaps Path
  .pipe(gulp.dest('dist/css'))
  ;
});

/* =============  VENDORS CSS UGLIFY  =============  */
gulp.task('cssVendorsUglify',['cssVendorsConcat'],function(){
  gulp.src([
    'dist/css/vendors.css'
])
.pipe(gulpUglifycss())
.pipe(gulpRename('vendors.min.css')) //Rename method used to have the vendors.min.js
.pipe(gulp.dest('dist/css'));
});




/*  =============  COMPILING SASS INTO CSS  =============  */

gulp.task('sass',function(){
  return gulp.src('scss/style.scss')
  .pipe(gulpSourcemaps.init()) //Creating css maps
  .pipe(gulpSass())
  .pipe(gulpSourcemaps.write('./')) //Creating css maps
  .pipe(gulp.dest('dist/css'));
});


/* =============  STYLE CSS UGLIFY  =============  */
gulp.task('cssStyleUglify',['sass'],function(){
  gulp.src([
    'dist/css/style.css'
])
.pipe(gulpUglifycss())
.pipe(gulpRename('style.min.css')) //Rename method used to have the vendors.min.js
.pipe(gulp.dest('dist/css'));
});





/* ******************** TASKS AND WATCH ********************** */


// Style from scss
gulp.task('compileStyle',['sass','cssStyleUglify']);

//Watch style scss Changes
gulp.task('watchStyle',function(){
  gulp.watch('scss/**/*.scss',['compileStyle']);
});

// App js
gulp.task('compileApp',['jsAppConcat','jsAppUglify']);


//Watch style scss Changes
gulp.task('watchApp',function(){
  gulp.watch('js/**/*.js',['compileApp']);
});

gulp.task('serve',['watchStyle','watchApp']);

// WHATTODONEXT

//Create task for watching changes on app js
//Create a serve task watching my minors Changes





gulp.task('default', ['jsVendorsConcat','jsVendorsUglify','jsAppConcat','jsAppUglify','sass','cssStyleUglify','cssVendorsConcat','cssVendorsUglify'],function(){
  console.log('Everything completed');
});
