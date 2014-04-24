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
        {person1: amy, person2: rory, dateTime: new Date(2018, 11, 7)}
    ];

    setup(function (setupFinished) {

        var people = database.get('people');
        people.drop();
        people.insert(expectedPeople);

        var lunches = database.get('lunch');
        lunches.drop();
        lunches.insert(expectedLunches, setupFinished);

    });

    test('can get all people from the database adapter', function (testDone) {
       var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople({},{},function(peopleRetrieved){
            assert. deepEqual(peopleRetrieved, expectedPeople);
            testDone();
        })
    });


    test('can get all people from the database adapter with some options like sort', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople({},{sort:{firstName:1}},function(peopleRetrieved){
            assert. deepEqual(peopleRetrieved[0], amy);
            assert. deepEqual(peopleRetrieved[1], donna)
            assert. deepEqual(peopleRetrieved[2], mickey)
            assert. deepEqual(peopleRetrieved[3], rory)
            assert. deepEqual(peopleRetrieved[4], rose)
            testDone();
        })
    });
    test('can search people from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople({email:'MSmithy@google.com'},{},function(peopleRetrieved){
            assert. equal(1, peopleRetrieved.length);
            assert.deepEqual(mickey, peopleRetrieved[0]);

            testDone();
        })
    });

    test('can search people from the database adapter with complete object as the filter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople(rose,{},function(peopleRetrieved){
            assert. equal(1, peopleRetrieved.length);
            assert.deepEqual(rose, peopleRetrieved[0]);

            testDone();
        })
    });

    test('can search people with regex the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople({email:{ $regex :'girlwhowaited@YAHOO.com', $options:'i'}},{},function(peopleRetrieved){
            assert. equal(1, peopleRetrieved.length);
            assert.deepEqual(amy, peopleRetrieved[0]);

            testDone();
        })
    });
    test('can get all lunches from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({},{},function(lunchesRetrieved){
            assert.deepEqual(lunchesRetrieved, expectedLunches);
            testDone();
        })
    });

    test('can get all lunches from the database adapter with options', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({},{sort:{dateTime:1}},function(lunchesRetrieved){
            assert.deepEqual(lunchesRetrieved[0], expectedLunches[1]);
            assert.deepEqual(lunchesRetrieved[1], expectedLunches[2]);
            assert.deepEqual(lunchesRetrieved[2], expectedLunches[0]);
            assert.deepEqual(lunchesRetrieved[3], expectedLunches[4]);
            assert.deepEqual(lunchesRetrieved[4], expectedLunches[3]);
            testDone();
        })
    });

    test('can save a lunch to the DB', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);

        var lunchToSave = {person1: donna, person2: rose, dateTime: new Date(2019, 17, 1)}
        databaseAdapter.saveLunch(lunchToSave, function () {
            databaseAdapter.getLunches({person1:donna, person2:rose},{}, function (lunchesRetrieved) {
                assert.equal( lunchesRetrieved.length,1);
                assert.deepEqual( lunchesRetrieved[0],lunchToSave);
                testDone();
            });
        });
    });
    test('can search lunches from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({person1:rory},{},function(lunchesRetrieved){
            assert. equal(1, lunchesRetrieved.length);
            assert.deepEqual(expectedLunches[1], lunchesRetrieved[0]);

            testDone();
        })
    });
    test('can search lunches from the database adapter with some sub searching', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({"person1.firstName": 'Rory'},{},function(lunchesRetrieved){
            assert. equal(1, lunchesRetrieved.length);
            assert.deepEqual(expectedLunches[1], lunchesRetrieved[0]);

            testDone();
        })
    });




})