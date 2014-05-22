var assert = require('assert');

var DatabaseAdapter = require('../../model/DatabaseAdapter');
var mongoUrl = 'localhost/testDb';
var monk = require('monk');
var database = monk(mongoUrl);


suite('DatabaseAdapterTest', function () {


    var rose = {_id:'123456789012',firstName: 'Rose', lastName: 'Tyler', email: 'rty@badwolf.net'};
    var amy = {_id:'445556789012',firstName: 'Amy', lastName: 'Pond', email: 'girlwhowaited@yahoo.com'};
    var rory = {_id:'000099998888',firstName: 'Rory', lastName: 'Williams', email: 'lastcenturion@yahoo.com'};
    var mickey = {_id:'1234mckdkfkd',firstName: 'Mickey', lastName: 'Smith', email: 'MSmithy@google.com'};
    var donna = {_id:'123456782123',firstName: 'Donna', lastName: 'Noble', email: 'dnoble@outlook.com'};
    var expectedPeople = [rose, amy, rory, mickey, donna ];

    var expectedLunches = [
        {person1: amy, person2: rose, dateTime: '2017-10-07T20:00:00.000Z'},
        {person1: rory, person2: mickey, dateTime: '2020-05-23T20:00:00.000Z'},
        {person1: amy, person2: donna, dateTime: '2015-10-01T20:00:00.000Z'},
        {person1: donna, person2: rory, dateTime: '2019-12-07T20:00:00.000Z'},
        {person1: amy, person2: rory, dateTime: '2018-11-07T20:00:00.000Z'}
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



    test('can search people with regex', function (testDone) {
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

    test('can get all lunches from the database adapter with sort', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({},{sort:{dateTime:1}},function(lunchesRetrieved){
            assert.deepEqual(lunchesRetrieved[0], expectedLunches[2]);
            assert.deepEqual(lunchesRetrieved[1], expectedLunches[0]);
            assert.deepEqual(lunchesRetrieved[2], expectedLunches[4]);
            assert.deepEqual(lunchesRetrieved[3], expectedLunches[3]);
            assert.deepEqual(lunchesRetrieved[4], expectedLunches[1]);
            testDone();
        })
    });
    test('get all lunches with filter and sort, functional test like the actual lunch retriever', function (testDone) {

        var filter =
        {$or: [
            {"person1._id": rory._id},
            {"person2._id": rory._id}
        ]};
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches(filter,{sort:{dateTime:1}},function(lunchesRetrieved){
            assert.equal( lunchesRetrieved.length,3);
            assert.deepEqual(lunchesRetrieved[0], expectedLunches[4]);
            assert.deepEqual(lunchesRetrieved[1], expectedLunches[3]);
            assert.deepEqual(lunchesRetrieved[2], expectedLunches[1]);
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