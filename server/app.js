const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const app = express();
const cors = require('cors');
const envConfig = require('./config/env.config');
const Logger = require('./util/logger');
const logger = new Logger(envConfig.logLevel, true);

const corsConfig = {
    origin: envConfig.nodeEnv === 'development' ? true : [
        'https://shrouded-atoll-81056.herokuapp.com'
    ]
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    if(!req.logger) {
        req.logger = logger;
    }

    res.on('finish', () => {
        const loggerData = {
            status: res.statusCode,
            method: req.method,
            url: `${req.hostname}${req.url}`
        };
        req.logger.info(loggerData);
    });

    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors(corsConfig));

app.use('/', indexRouter);
app.use('/api', apiRouter);

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
