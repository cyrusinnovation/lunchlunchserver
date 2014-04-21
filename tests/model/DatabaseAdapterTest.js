var assert = require('assert');

var DatabaseAdapter = require('../../model/DatabaseAdapter');
var mongoUrl = 'localhost/testDb';
var monk = require('monk');
var database = monk(mongoUrl);

suite('DatabaseAdapterTest', function () {


    var rose = {firstName: 'Rose', lastName: 'Tyler', email: 'rty@badwolf.net'};
    var amy = {firstName: 'Amy', lastName: 'Pond', email: 'girlwhowaited@yahoo.com'};
    var rory = {firstName: 'Rory', lastName: 'Williams', email: 'lastcenturion@yahoo.com'};
    var mickey = {firstName: 'Mickey', lastName: 'Smith', email: 'MSmithy@google.com'};
    var donna = {firstName: 'Donna', lastName: 'Noble', email: 'dnoble@outlook.com'};
    var expectedPeople = [rose, amy, rory, mickey, donna ];

    var expectedLunches = [
        {person1: amy, person2: rose, dateTime: new Date(2017, 10, 7)},
        {person1: rory, person2: mickey, dateTime: new Date(2014, 5, 23)},
        {person1: amy, person2: donna, dateTime: new Date(2015, 10, 1)},
        {person1: donna, person2: rory, dateTime: new Date(2019, 12, 7)},
        {person1: amy, person2: rory, dateTime: new Date(2018, 11, 7)},
    ];

    setup(function (setupFinished) {

        var people = database.get('people');
        people.drop();
        people.insert(expectedPeople);

        var lunches = database.get('lunch');
        lunches.drop();
        lunches.insert(expectedLunches, setupFinished);

    });

    test('can get people from the database adapter', function (testDone) {
       var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople(function(peopleRetrieved){
            console.log(peopleRetrieved);
            assert. deepEqual(peopleRetrieved, expectedPeople);
            testDone();
        })
    });


    test('can get lunches from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches(function(lunchesRetrieved){
            assert. deepEqual(lunchesRetrieved, expectedLunches);
            testDone();
        })
    });
})