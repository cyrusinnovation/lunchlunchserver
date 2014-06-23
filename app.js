
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var login = require('./routes/login');
var getlunches = require('./routes/getlunches');
var locations = require('./routes/locations');
var createlunch = require('./routes/createlunch');
var config = require('./config.json');
var buddy = require('./routes/buddy');
var PersonRetrieverFactory = require('./model/PersonRetrieverFactory');
var personRetrieverFactory = new PersonRetrieverFactory();
var LunchRetrieverFactory = require('./model/LunchRetrieverFactory');
var lunchRetrieverFactory = new LunchRetrieverFactory();
var LunchBuddyFinderFactory = require('./model/LunchBuddyFinderFactory');
var lunchBuddyFinderFactory = new LunchBuddyFinderFactory();
var LocationRetrieverFactory = require('./model/LocationRetrieverFactory');
var locationRetrieverFactory = new LocationRetrieverFactory();
var app = express();
var DatabaseAdapter = require('./model/DatabaseAdapter');
var databaseAdapter = new DatabaseAdapter(config.mongoUrl)

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', login.login(personRetrieverFactory.buildPersonRetriever(databaseAdapter)));
app.get('/getLunches', getlunches.getLunches(lunchRetrieverFactory.buildLunchRetriever(databaseAdapter)));
app.get('/locations', locations.locations(locationRetrieverFactory.buildLocationRetriever(databaseAdapter)));
app.get('/findBuddy', buddy.findBuddy(lunchBuddyFinderFactory.buildLunchBuddyFinder(databaseAdapter)));
app.post('/createLunch', createlunch.createLunch(databaseAdapter));
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
