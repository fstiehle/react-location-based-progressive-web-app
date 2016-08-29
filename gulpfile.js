var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minifier'),
    path = require('path'),
    swPrecache = require('sw-precache');

var dependencies = [
	'react',
  	'react-dom'
];

var DEV_DIR = 'src';
var DIST_DIR = 'dist';

// If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
// the service worker will precache resources but won't actually serve them.
// This allows you to test precaching behavior without worry about the cache preventing your
// local changes from being picked up during the development cycle.
var handleFetch = true;
 
// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('webserver', function() {
  connect.server({
    port: 8080,
    host: 'localhost',
    root: DIST_DIR,
    livereload: true
  });
});
 
gulp.task('deploy', function () {
	bundleApp(true);
});
 
// Watches for changes in the DEV_DIR
gulp.task('watch', function () {
	gulp.watch([DEV_DIR + '/**/*'], ['sass', 'copy-static', 'scripts']);
});

// Copies assets to the DIST folder
gulp.task('copy-static', function () {
  return gulp.src(DEV_DIR +  '/static/**/*')
      .pipe(gulp.dest(DIST_DIR));
});

// Run 'minify' for final shipable code
gulp.task('minify', function() {
  return gulp.src(DIST_DIR + '/**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
  })).pipe(gulp.dest(DIST_DIR));
});
 
// sass and autoprefixing 
gulp.task('sass', function () {
  return gulp.src(DEV_DIR + '/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
     }))
    .pipe(gulp.dest(DIST_DIR + '/css/'));
});

// Service Worker via sw-precache
gulp.task('generate-service-worker', function(callback) {
    swPrecache.write(path.join(DIST_DIR, 'service-worker.js'), {
        staticFileGlobs: [DIST_DIR + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],

        // Dynamic API data fetch
        handleFetch: handleFetch,
        runtimeCaching: [{
            // See https://github.com/GoogleChrome/sw-toolbox#methods
            urlPattern: /https:\/\/api.foursquare.com\/v2\/venues\/explore/,
            handler: 'fastest',
            // See https://github.com/GoogleChrome/sw-toolbox#options
            options: {
                cache: {
                    maxEntries: 6,
                    name: 'runtime-cache'
                }
            }
        }],

        stripPrefix: DIST_DIR
    }, callback);
});

// Run this for the final build
// Run 'minify' before the code is shiped
gulp.task('build', ['scripts',
                    'copy-static',
                    'generate-service-worker',
                    'sass']);
 
// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'watch' defined above will fire.
gulp.task('default', ['scripts',
                      'copy-static',
                      'generate-service-worker',
                      'sass',
                      'webserver',
                      'watch']);
 
// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(deploy) {
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: DEV_DIR + '/app.jsx',
    	debug: false
  	})

  	appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest(DIST_DIR + '/js'))
        .pipe(connect.reload());
}