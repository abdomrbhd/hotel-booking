const gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  livereload = require("gulp-livereload"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  terser = require("gulp-terser"),
  notify = require("gulp-notify"),
  zip = require("gulp-zip"),
  babel = require("gulp-babel");

// html task
gulp.task("html", function () {
  return gulp
    .src("src/template/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist/html"))
    .pipe(livereload());
});

// css task
gulp.task("css", function () {
  return gulp
    .src("src/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(prefix("last 2 versions"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
});

// javascript task
gulp.task("js", function () {
  return gulp
    .src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [["@babel/env", { modules: false }]],
      })
    )
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});

// compress files task
// gulp.task("compress", function () {
//   return gulp.src("dist/**/*.*").pipe(zip("site.zip")).pipe(gulp.dest("."));
// });

// watch task
gulp.task("watch", function () {
  require("./server");
  livereload.listen();
  gulp.watch("src/**/*.pug", gulp.series("html"));
  gulp.watch("src/scss/**/*.scss", gulp.series("css"));
  gulp.watch("src/js/*.js", gulp.series("js"));
  // gulp.watch("dist/**/*.*", gulp.series("compress"));
});

// default task
gulp.task("default", gulp.series("watch"));
