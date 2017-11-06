
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean-css')
var htmls= require('gulp-htmlmin')
gulp.task('server',function(){
    gulp.src('.')
        .pipe(webserver({
            port:8080,
            middleware:function(req,res,next){
                var method = req.method;
                res.setHeader("Access-Control-Allow-Origin","*")
                res.setHeader('content-type','text/html;charset=utf-8')
                if(method==='GET'){
                   
                    //   res.wirteHead('content-type','text/html;charset=utf-8')
                    res.end(require('fs').readFileSync('./mock.json').toString())
                }
            },
            open:true
        }))
})

    gulp.task('mincss',function(){
        gulp.src('css/style.css')
            .pipe(clean())
            .pipe(gulp.dest('./css/'))
    })
    gulp.task('htmlmin',function(){
        var option={
            collapseWhitespace:true,
            miniCSS:true,
            miniJS:true
        }
        gulp.src('./index.html')
        .pipe(htmls(option))
        .pipe(gulp.dest('./html/'))
    })

    gulp.task('default',['mincss','htmlmin'])