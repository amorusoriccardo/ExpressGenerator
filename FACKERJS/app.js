var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();
var faker = require('faker');

const fs = require('fs');

var poeti = null;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



////////////////////////////////
if(fs.existsSync('poeti.json'))
{
  poeti = require('./poeti')
}
else
{
  poeti = new Array();
  for(let i = 0; i < 10; i++)
  {
    obj = {
      id : i,
      firstName : faker.name.firstName(1),
      lastName : faker.name.lastName(),
      age : faker.random.number(90),
      image: faker.image.people(),
      email : faker.internet.email(),
      website : faker.internet.url(),
      nationality : faker.address.country(),
      poesie : [
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph()
      ]
    }
    console.log(obj)
    poeti.push(obj);

  }
  console.log(poeti);
  fs.writeFileSync("poeti.json", JSON.stringify(poeti));
}
console.log(poeti);
//////////////////////////////////


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var serviceRouter = require('./routes/services')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/services', serviceRouter);

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
module.exports = app;

