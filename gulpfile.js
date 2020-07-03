'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
const svgSprite = require('gulp-svg-sprite');

// const svgSpriteConfig = {
//   mode: {
//     css: { // Activate the «css» mode
//       render: {
//         css: false // Activate CSS output (with default options)
//       }
//     }
//   }
// };
const svgSpriteConfig = {
  mode: {
    symbol: {
      dest: 'svg-output',
      sprite: 'svg-sprite.svg'
    }
  }
}
gulp.src('img/svg-src/*.svg')
// gulp.src('img/svg/*.svg', { cwd: 'path/to/assets' })
  .pipe(svgSprite(svgSpriteConfig))
  .pipe(gulp.dest('img/'));
// gulp.src('**/*.svg', { cwd: 'path/to/assets' })
//   .pipe(svgSprite(config))
//   .pipe(gulp.dest('out'));



sass.compiler = require('node-sass');
 //sass
gulp.task('sass', function () {
  return gulp.src('./sass/*.sass')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //autoprefixer
    .pipe(autoprefixer({cascade: false}))
    .pipe(gulp.dest('./css'));
    
});
//pug
gulp.task('pug', function buildHTML() {
    return gulp.src('pug/*.pug')
    .pipe(pug({
      // Your options in here.
      pretty: true,
    }))
    .pipe(gulp.dest('./'));
  });

gulp.task('default', function() {
    gulp.watch('./sass/*.sass', gulp.series('sass'));
    gulp.watch('pug/*.pug', gulp.series('pug'));
});

 
