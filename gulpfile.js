var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    jade         = require("gulp-jade"),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require("browser-sync").create();

function error(error) {
    console.log(error.toString());
    this.emit("end");
}

gulp.task("hello", function() {
    console.log("Hello world!");
});

gulp.task("jade", function() {
    console.log("Processing jade file(s)...");
    return gulp.src("app/jade/index.jade")
               .pipe(jade())
               .on("error", error)
               .pipe(gulp.dest("./"))
               .pipe(browserSync.stream());
});

gulp.task("sass", function() {
    console.log("Processing sass file(s)...");
    return gulp.src("app/sass/*.sass")
               .pipe(sass())
               .on("error", error)
               .pipe(autoprefixer())
               .on("error", error)
               .pipe(gulp.dest("dist/css"))
               .pipe(browserSync.stream());
});

gulp.task("compile", ["jade", "sass"], function() {
    console.log("Preprocessing...");
});

gulp.task("develop", ["compile"], function(){
    var PORT = 8080;
    console.log("Project '"+__dirname.split("\\").pop()+"' developer mode initialized! Press Ctrl+C to terminate.");
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false,
        open: false,
        logConnections: true,
        port: PORT
    }, function() {
        console.log("Server started at localhost:"+PORT);
    });
    gulp.watch("app/jade/**/*.jade", ["jade"]);
    gulp.watch("app/sass/**/*.sass", ["sass"]);
});
