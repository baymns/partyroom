const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registrationRouter = require('./routes/registration');
const roomsRouter = require('./routes/rooms');
const urlRouter = require('./routes/shortUrl');
const logoutRouter = require('./routes/logout');
const wishlistRouter = require('./routes/wishList');

const app = express();

mongoose.connect('mongodb://localhost:27017/Partyroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    store: new FileStore(),
    key: 'user_sid',
    secret: 'anything here',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
    },
  })
);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/sh', urlRouter);

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.name = req.session.user.name;
    res.locals.id = req.session.user._id;
    return next();
  } else {
    res.redirect('/login');
  }
});

app.use('/rooms', roomsRouter);
app.use('/logout', logoutRouter);
app.use('/wishlist', wishlistRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
