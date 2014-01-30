
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('longcatislong'));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * This middleware checks the incoming route to determine if it
 * is an ajax request. If it isn't, we skip the current route 
 * (i.e. we do NOT continue to next middleware on this route)
 * by calling next('route'). Otherwise continue with current
 * route 
 */
function checkAjax(req, res, next){
    if (!req.xhr) next('route');
    else next();
}

app.get('/users', checkAjax, user.listAll);
app.post('/users', checkAjax, user.create);
app.get('/users/:id', checkAjax, user.findById);

/** 
 * This route ensures that any other request that 
 * isn't matched above falls through to rendering
 * our index.ejs file, where AngularJS can take over
 * and do its own route handling
 */
app.use(routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
