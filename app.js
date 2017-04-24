var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');


var app = express();

app.use(compression());

if (process.env.NODE_ENV == undefined || process.env.NODE_ENV === 'development'){
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackConfig = require('./webpack.config');
    const webpack = require('webpack');

    var complier = webpack(webpackConfig);

    app.use(webpackDevMiddleware(complier,{

    }));

}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html',require('hbs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'appdist')));


// app.use('/', index);
// app.use('/users', users);

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

module.exports = app;
