import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import bs from 'browser-sync';
import del from 'del';
import rename from 'gulp-rename';

/* -- CONFIG -- */
const src = {
   scss: 'app/Resources/web/scss/',
   proxydir: 'localhost/simplefw/web/',
   css: 'web/css/',
   scssInputFileName:'main.scss',
   cssOutputFileName:'main.css'  

}

const options = {



   sass: {
       outputStyle: 'compressed'
   }

}


/* -- TASKS -- */


gulp.task('clean:custom', function() {
  return del([ src.css + src.cssOutputFileName ])
});


gulp.task('serve', function() {
   bs.init({
       proxy: src.proxydir,
       open: true,
       https: false
   });
   gulp.watch(src.scss + '**/*.scss', ['clean:custom', 'sass:custom']);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass:custom', function() {
   return gulp.src(src.scss + src.scssInputFileName)
       .pipe(sourcemaps.init())
       .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
       .pipe(sourcemaps.write())
       .pipe(rename(src.cssOutputFileName))
       .pipe(gulp.dest(src.css))
       .pipe(bs.stream());
});

gulp.task('default', ['clean:custom','sass:custom', 'serve']);