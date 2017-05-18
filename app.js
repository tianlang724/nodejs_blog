var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');;
var MongoStore=require('connect-mongo')(session);
var settings=require('./Setting');
var mongoose = require('mongoose'); 


var index = require('./routes/index');
var users = require('./routes/users');
var login=require('./routes/login');
var logout=require('./routes/logout');
var post=require('./routes/post');
var reg=require('./routes/reg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //设置页面模板的位置
app.set('view engine', 'ejs'); //设置模板引擎

// app.set('view options', { 
// layout: true
// }); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:settings.cookieSecret,
  store:new MongoStore({
    db:settings.db
  })
}));

//使用路由
app.use('/', index);   
app.use('/users', users);
app.use('/post',post);
app.use('/reg',reg);
app.use('/login',login);
app.use('/logout',logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000);

module.exports = app;
