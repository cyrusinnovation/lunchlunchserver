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
        {person1: ironman, person2: thor, dateTime: '2017-07-11T20:00:00.000Z'},
        {person1: ironman, person2: wasp, dateTime: '2013-05-07T20:00:00.000Z'},
        {person1: ironman, person2: antman, dateTime: '2027-09-25T20:00:00.000Z'},
        {person1: ironman, person2: hulk, dateTime: '2014-02-14T20:00:00.000Z'},
        {person1: thor, person2: wasp, dateTime: '2092-12-05T20:00:00.000Z'},
        {person1: thor, person2: antman, dateTime: '2019-04-22T20:00:00.000Z'},
        {person1: thor, person2: hulk, dateTime: '2015-02-03T20:00:00.000Z'},
        {person1: wasp, person2: antman, dateTime: '2013-09-12T20:00:00.000Z'},
        {person1: wasp, person2: hulk, dateTime: '2017-10-07T20:00:00.000Z'}
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






