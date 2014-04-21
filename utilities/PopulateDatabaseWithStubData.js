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

    var stubLunches = [
        {person1: ironman, person2: thor, dateTime: new Date(2017,  7,11)},
        {person1: ironman, person2: wasp, dateTime: new Date(2013, 5, 7)},
        {person1: ironman, person2: antman, dateTime: new Date(2027, 25,9)},
        {person1: ironman, person2: hulk, dateTime: new Date(2014, 14, 2)},
        {person1: thor, person2: wasp, dateTime: new Date(2092, 5, 12)},
        {person1: thor, person2: antman, dateTime: new Date(2019, 22, 4)},
        {person1: thor, person2: hulk, dateTime: new Date(2015, 3, 2)},
        {person1: wasp, person2: antman, dateTime: new Date(2013, 12, 9)},
        {person1: wasp, person2: hulk, dateTime: new Date(2017, 7, 10)}
    ];

    test('Not really a test, just a means to populate the database', function (done) {

        var people = database.get('people');
        people.drop();
        people.insert(stubPeople);

        var lunches = database.get('lunch');
        lunches.drop();
        lunches.insert(stubLunches, done);

    });
})






