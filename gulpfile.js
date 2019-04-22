const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const run = require('gulp-run');
const sourcemaps = require('gulp-sourcemaps');
const pkg = require('./package.json');
const colors = require('ansi-colors');
const log = require('fancy-log');

const tsProject = ts.createProject('tsconfig.json');

log(colors.yellow('App Name  : '), colors.green.bold(pkg.name));
log(colors.yellow('Version   : '), colors.green.bold(pkg.version));
log(colors.yellow('Entry File: '), colors.green.bold(pkg.main));

gulp.task('clean', function(){
  // Clean up the build directory
  return del('./build', './' + pkg.name + '*');
});

// gulp.task('compile-ts', gulp.series('clean'), function(){
gulp.task('compile-ts', function(){
  const tsResult = gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('.', {
      includeContent: false
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('move-windows', function(){
  // Copy all other files that are needed over to the build directory
  return gulp.src('./src/app/**/!(*.ts)')
    .pipe(gulp.dest('build/app'));
});

gulp.task('build', 
  gulp.series('clean', gulp.parallel('compile-ts', 'move-windows')));

gulp.task('build-executable', 
  gulp.series('clean', gulp.parallel('compile-ts', 'move-windows'), function(){
  return run('npm run build-app').exec()
}));