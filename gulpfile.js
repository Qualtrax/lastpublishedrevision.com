var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('nodemon');

var paths = {

    styles: {
		src: 'public/content/sass',
		files: 'public/content/sass/**/*.scss',
		dest: 'public/content/css'
	}
}

var displayError = function(error) {

    var errorString = '[' + error.plugin + ']';
	errorString += ' ' + error.message.replace("\n",'');

	if(error.fileName)
		errorString += ' in ' + error.fileName;

	if(error.lineNumber)
		errorString += ' on line ' + error.lineNumber;

	console.error(errorString);
}

gulp.task('sass', function (){
	gulp.src(paths.styles.files)
	.pipe(sass({
		outputStyle: 'compressed',
		sourceComments: 'map',
		includePaths : [paths.styles.src]
	}))
	.on('error', function(err){
		displayError(err);
	})
	.pipe(gulp.dest(paths.styles.dest))
});

gulp.task('sass-watch', ['sass'], function() {
	gulp.watch(paths.styles.files, ['sass'])
	.on('change', function(evt) {
		console.log(
			'[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
		);
	});
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  })
});
