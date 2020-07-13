var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var test = require('./Server/controllers/test');
var Admin = require('./Server/controllers/AdminREST');
var Auth = require('./Server/controllers/Auth');
var User = require('./Server/controllers/usersREST');
var Appoi = require('./Server/controllers/appoiREST');
var Diagnosis = require('./Server/controllers/diagnosisREST');
var Disease = require('./Server/controllers/diseaseREST');
var Patient = require('./Server/controllers/patientREST');
// var appointment = require('./Server/routes/appointment');
// var diagnosis = require('./Server/routes/diagnosis');
// var dietplan = require('./Server/routes/dietplan');
// var disease = require('./Server/routes/disease');
// var medicine = require('./Server/routes/medicine');
// var patient = require('./Server/routes/patient');
// var prescription = require('./Server/routes/prescription');
// var user = require('./Server/routes/user');
var Dashboard = require('./Server/routes/dashboard');

var app = express();
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('',test);
app.use('/api/Admin', Admin);
app.use('/api/auth', Auth);
app.use('/api/auth', User);
app.use('/api/auth', Appoi);
app.use('/api/auth', Diagnosis);
app.use('/api/auth', Disease);
app.use('/api/auth', Patient);
app.use('/api', Dashboard);
// app.use('/appointment', appointment);
// app.use('/diagnosis', diagnosis);
// app.use('/dietplan', dietplan);
// app.use('/disease', disease);
// app.use('/medicine', medicine);
// app.use('/patient', patient);
// app.use('/prescription', prescription);
// app.use('/user', user);
app.use('', Dashboard);

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
