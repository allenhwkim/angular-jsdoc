var gulp = require('gulp');
var bump = require('gulp-bump');
var shell = require('gulp-shell');
var tap = require('gulp-tap');
var gutil = require('gulp-util');
var bumpVersion = function(type) {
  type = type || 'patch';
  var version = '';
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: type}))
    .pipe(gulp.dest('./'))
    .pipe(tap(function(file, t) {
      version = JSON.parse(file.contents.toString()).version;
    })).on('end', function() {
      var color = gutil.colors;
      gulp.src('')
        .pipe(shell([
          'git commit --all --message "Version ' + version + '"',
          (type != 'patch' ? 'git tag --annotate "v' + version + '" --message "Version ' + version + '"' : 'true')
        ], {ignoreErrors: false}))
        .pipe(tap(function() {
          gutil.log(color.green("Version bumped to ") + color.yellow(version) + color.green(", don't forget to push!"));
        }));
    });

};

gulp.task('bump',       function() { bumpVersion('patch'); });
gulp.task('bump:patch', function() { bumpVersion('patch'); });
gulp.task('bump:minor', function() { bumpVersion('minor'); });
gulp.task('bump:major', function() { bumpVersion('major'); });
