var assert = require('assert');

var DatabaseAdapter = require('../model/DatabaseAdapter');
var mongoUrl = 'localhost/LunchLunchDB';
var monk = require('monk');
var database = monk(mongoUrl);
suite('PopulateDatabaseWithStubData', function () {

    var ironman = {firstName: 'Tony', lastName: 'Stark', email: 'fedude@stark.net'};
    var thor = {firstName: 'Donald', lastName: 'Blake', email: 'drblake@gmail.com'};
    var wasp = {firstName: 'Janet', lastName: 'Van Dyne', email: 'jvd@yahoo.com'};
    var antman = {firstName: 'Hank', lastName: 'Pym', email: 'hpym@yahoo.com'};
    var hulk = {firstName: 'Bruce', lastName: 'Banner', email: 'bban@outlook.com'};
    var stubPeople = [ironman, thor, wasp, antman, hulk ];

    var location1 =  {name:'Dos Toros', address:'11 Carmine St', zipCode:'10014'};
    var location2 =  {name:'Dig In', address:'350 Hudson Street',     zipCode:'10014'};
    var location3 =  {name:'Dive Bar', address:'732 Amsterdam Ave', zipCode:'10025'};
    var location4 =  {name: 'Gordon Ramsay at The London NYC', address:'151 W 54th St', zipCode:'10019'};
    var location5 =  {name:'Grays Papaya', address:'2090 Broadway', zipCode:'10023'};
    var stubLocations = [location1, location2, location3, location4, location5];

    var stubLunches = [
        {person1: ironman, person2: thor, dateTime: '2017-07-11T20:00:00.000Z', location: location1},
        {person1: ironman, person2: wasp, dateTime: '2013-05-07T20:00:00.000Z', location: location2},
        {person1: ironman, person2: antman, dateTime: '2027-25-09T20:00:00.000Z', location: location3},
        {person1: ironman, person2: hulk, dateTime: '2014-14-02T20:00:00.000Z', location: location4},
        {person1: thor, person2: wasp, dateTime: '2092-12-05T20:00:00.000Z', location: location5},
        {person1: thor, person2: antman, dateTime: '2019-22-04T20:00:00.000Z', location: location4},
        {person1: thor, person2: hulk, dateTime: '2015-02-03T20:00:00.000Z', location: location3},
        {person1: wasp, person2: antman, dateTime: '2013-09-12T20:00:00.000Z', location: location2},
        {person1: wasp, person2: hulk, dateTime: '2017-10-07T20:00:00.000Z', location: location1},
        {person1: ironman, person2: hulk, dateTime: '2019-14-05T20:00:00.000Z'},
    ];

    test('Not really a test, just a means to populate the database', function (done) {

        var people = database.get('people');
        people.drop();
        people.insert(stubPeople);

        var locations = database.get('location');
        locations.drop();
        locations.insert(stubLocations);

        var lunches = database.get('lunch');
        lunches.drop();
        lunches.insert(stubLunches, done);
        done();

    });
})






