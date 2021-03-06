var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require('mongoose');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var dashboardRouter=require('./routes/dashboard');
var dethiRouter=require("./routes/dethi");
var part5Router=require("./routes/part5Router");


var app = express();
mongoose.connect('mongodb://localhost:27017/learningenglist', {useNewUrlParser: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/dashboard',dashboardRouter);
app.use("/dethi",dethiRouter);
app.use("/part5",part5Router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


app.locals.dethi=require("./dbs/dethi.json"); // để lấy được dữ liệu trong file json
module.exports = app;
