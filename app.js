/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var login = require('./routes/login');
var getLunches = require('./routes/getlunches');
var locations = require('./routes/locations');
var createLunch = require('./routes/createlunch');
var createLocation = require('./routes/createlocation');
var createPerson = require('./routes/createperson');
var setLunchLocation = require('./routes/setlunchlocation');


var config = require('konphyg')(__dirname+"/config");
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
var databaseAdapter = new DatabaseAdapter(config('lunchBuddy').mongoUrl);
var APITokenHelper = require('./helper/ApiTokenHelper');
var apiTokenHelper = new APITokenHelper();

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

app.all('*', function (req, res, next) {
    if (apiTokenHelper.checkForApiToken(req, function (containsToken) {
        if (containsToken) {
            next();
        } else {
            return res.send({error: "no api token"});
        }
    }));

});

app.get('/', routes.index);
app.post('/login', login.login(personRetrieverFactory.buildPersonRetriever(databaseAdapter)));
app.post('/getLunches', getLunches.getLunches(lunchRetrieverFactory.buildLunchRetriever(databaseAdapter)));
app.get('/locations', locations.locations(locationRetrieverFactory.buildLocationRetriever(databaseAdapter)));
app.post('/findBuddy', buddy.findBuddy(lunchBuddyFinderFactory.buildLunchBuddyFinder(databaseAdapter)));
app.post('/createLunch', createLunch.createLunch(databaseAdapter));
app.post('/createLocation', createLocation.createLocation(databaseAdapter));
app.post('/createPerson', createPerson.createPerson(databaseAdapter));
app.put('/setLunchLocation', setLunchLocation.updateLunch(databaseAdapter));
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});