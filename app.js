var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://phuclvps30728:VsBp1G8nhbFfEDBW@phucdu.njl6o2k.mongodb.net/', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

var indexRouter = require('./routes/index');
var nguoidungsRouter = require('./routes/nguoidungs'); // Import đúng router
var sanphamsRouter = require('./routes/sanphams');
var sinhVientRouter = require('./routes/sinhvien');
var loaiSPRouter = require('./routes/loais');
var modelRouter = require('./routes/models');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', nguoidungsRouter); // Sử dụng đúng router
app.use('/sanphams', sanphamsRouter);
app.use('/loais', loaiSPRouter);
app.use('/sinhvien', sinhVientRouter);
app.use('/models', modelRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
