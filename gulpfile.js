var gulp         = require("gulp"),
    pug          = require("gulp-pug"),
    sass         = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    imagemin     = require("gulp-imagemin"),
    cache        = require("gulp-cache"),
    del          = require("del"),
    runSequence  = require("run-sequence"),
    browserSync  = require("browser-sync").create(),
    autoClose    = require("browser-sync-close-hook"),
    argv         = require("yargs").argv,
    langs        = ["pug", "sass", "js"];

config = {
    port: 8080,
    root: "./"
};

function error(error) {
    console.log(error.toString());
    this.emit("end");
}

gulp.task("pug", function() {
    console.log("Processing pug file(s)...");
    return gulp.src(config.root+"app/pug/index.pug")
               .pipe(pug())
               .on("error", error)
               .pipe(gulp.dest(config.root))
               .pipe(browserSync.stream());
});

gulp.task("sass", function() {
    console.log("Processing sass file(s)...");
    return gulp.src(config.root+"app/sass/*.sass")
               .pipe(sass())
               .on("error", error)
               .pipe(autoprefixer())
               .on("error", error)
               .pipe(gulp.dest(config.root+"dist/css"))
               .pipe(browserSync.stream());
});

gulp.task("js", function() {
    console.log("Processing js file(s)...");
    return gulp.src(config.root+"app/js/*.js")
               .pipe(gulp.dest(config.root+"dist/js"))
               .pipe(browserSync.stream());
});

gulp.task("img", function(){
    console.log("Processing image(s)...");
    return gulp.src(config.root+"app/img/**/*.+(png|jpg|gif|svg)")
               .pipe(cache(imagemin()))
               .on("error", error)
               .pipe(gulp.dest(config.root+"dist/img/"));
});

gulp.task("clean", function(callback){
    config.port = (argv.p || argv.port) || config.port;
    config.root = (argv.r || argv.root) || config.root;
    console.log("Deleting folder '"+config.root+"dist/"+"'...")
    return del(config.root+"dist/**/*.*");
});

gulp.task("build", ["clean"], function(callback) {
    console.log("Preprocessing...");
    runSequence("img", langs, callback);
});

gulp.task("watch", function(){
    config.root = (argv.r || argv.root) || config.root;
    console.log("Watching scripts in directory '"+config.root+"'...");
    for (var i = 0, lang; lang = langs[i ++];) {
        console.log(lang);
        gulp.watch(config.root+"app/"+lang+"/**/*."+lang, [lang]);
    }
    gulp.watch(config.root+"app/img/**/*.+(png|jpg|gif|svg)", ["img"]);
});

gulp.task("server", function(){
    config.port = (argv.p || argv.port) || config.port;
    browserSync.use({
        plugin() {},
        hooks: {
            "client:js": autoClose
        }
    });
    browserSync.init({
        server: {
            baseDir: config.root
        },
        notify: false,
        open: false,
        logConnections: true,
        port: config.port
    }, function() {
        console.log("Server started at localhost:"+config.port);
    });
});

gulp.task("default", function(){
    config.port = (argv.p || argv.port) || config.port;
    config.root = (argv.r || argv.root) || config.root;
    console.log("Project '"+config.root+"' developer mode initialized! Press Ctrl+C to terminate.");
    runSequence("build", "server", "watch");
});
