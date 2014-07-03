var assert = require('assert');

var DatabaseAdapter = require('../../model/DatabaseAdapter');
var mongoUrl = 'localhost/testDb';
var monk = require('monk');
var database = monk(mongoUrl);


suite('DatabaseAdapterTest', function () {


    const rose = {_id: '123456789012', firstName: 'Rose', lastName: 'Tyler', email: 'rty@badwolf.net'};
    const amy = {_id: '445556789012', firstName: 'Amy', lastName: 'Pond', email: 'girlwhowaited@yahoo.com'};
    const rory = {_id: '000099998888', firstName: 'Rory', lastName: 'Williams', email: 'lastcenturion@yahoo.com'};
    const mickey = {_id: '1234mckdkfkd', firstName: 'Mickey', lastName: 'Smith', email: 'MSmithy@google.com'};
    const donna = {_id: '123456782123', firstName: 'Donna', lastName: 'Noble', email: 'dnoble@outlook.com'};
    const expectedPeople = [rose, amy, rory, mickey, donna ];

    const expectedLunches = [
        {person1: amy, person2: rose, dateTime: '2017-10-07T20:00:00.000Z'},
        {person1: rory, person2: mickey, dateTime: '2020-05-23T20:00:00.000Z'},
        {person1: amy, person2: donna, dateTime: '2015-10-01T20:00:00.000Z'},
        {person1: donna, person2: rory, dateTime: '2019-12-07T20:00:00.000Z'},
        {person1: amy, person2: rory, dateTime: '2018-11-07T20:00:00.000Z'}
    ];

    const dosToros = {name: 'Dos Toros', address: '11 Carmine St', zipCode: '10014'};
    const digIn = {name: 'Dig In', address: '350 Hudson Street', zipCode: '10014'};
    const diveBar = {name: 'Dive Bar', address: '732 Amsterdam Ave', zipCode: '10025'};
    const gordonRamsay = {name: 'Gordon Ramsay at The London NYC', address: '151 W 54th St', zipCode: '10019'};
    const graysPapaya = {name: 'Grays Papaya', address: '2090 Broadway', zipCode: '10023'};
    const expectedLocations = [dosToros, digIn, diveBar, gordonRamsay, graysPapaya];

    setup(function (setupFinished) {

        var people = database.get('people');
        people.drop();
        people.insert(expectedPeople);

        var lunches = database.get('lunch');
        lunches.drop();
        lunches.insert(expectedLunches);

        var locations = database.get('location');
        locations.drop();
        locations.insert(expectedLocations, setupFinished);

    });

    teardown(function(teardownComplete){
        var people = database.get('people');
        people.drop();
        var lunches = database.get('lunch');
        lunches.drop();
        var locations = database.get('location');
        locations.drop(teardownComplete);
    });



    test('can get all people from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople({}, {}, function (peopleRetrieved) {
            assert.deepEqual(peopleRetrieved, expectedPeople);
            testDone();
        })
    });


    test('can get all people from the database adapter with some options like sort', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople({}, {sort: {firstName: 1}}, function (peopleRetrieved) {
            assert.deepEqual(peopleRetrieved[0], amy);
            assert.deepEqual(peopleRetrieved[1], donna)
            assert.deepEqual(peopleRetrieved[2], mickey)
            assert.deepEqual(peopleRetrieved[3], rory)
            assert.deepEqual(peopleRetrieved[4], rose)
            testDone();
        })
    });
    test('can search people from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople({email: 'MSmithy@google.com'}, {}, function (peopleRetrieved) {
            assert.equal(1, peopleRetrieved.length);
            assert.deepEqual(mickey, peopleRetrieved[0]);
            testDone();
        });
    });
    test('search people functional test, a partial match should not return anything', function (testDone) {
        var filter =  {email:{ $regex : new RegExp('^dnob$'), $options:'i'}};
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople(filter, {}, function (peopleRetrieved) {
            assert.equal( peopleRetrieved.length,0);
        });
        var filter =  {email:{ $regex : new RegExp('^DnOble@outlook.com$'), $options:'i'}};
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople(filter, {}, function (peopleRetrieved) {
            assert.equal(peopleRetrieved.length, 1);
            assert.deepEqual(donna, peopleRetrieved[0]);
            testDone();
        });
    });

   test('can get all locations from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLocations({}, {}, function (locationsRetrieved) {
            assert.deepEqual(locationsRetrieved, expectedLocations);
            testDone();
        });
    });


    test('can get all locations from the database adapter with some options like sort', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLocations({}, {sort: {name: 1}}, function (locationsRetrieved) {

            assert.deepEqual(locationsRetrieved[0], digIn);
            assert.deepEqual(locationsRetrieved[1], diveBar)
            assert.deepEqual(locationsRetrieved[2], dosToros)
            assert.deepEqual(locationsRetrieved[3], gordonRamsay)
            assert.deepEqual(locationsRetrieved[4], graysPapaya)
            testDone();
        });
    });
    test('can search locations from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLocations({zipCode: '10014'}, {}, function (locationsRetrieved) {
            assert.equal(2, locationsRetrieved.length);
            assert.deepEqual(dosToros, locationsRetrieved[0]);
            assert.deepEqual(digIn, locationsRetrieved[1]);

            testDone();
        })
    });


    test('can search people with regex', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getPeople({email: { $regex: 'girlwhowaited@YAHOO.com', $options: 'i'}}, {}, function (peopleRetrieved) {
            assert.equal(1, peopleRetrieved.length);
            assert.deepEqual(amy, peopleRetrieved[0]);

            testDone();
        })
    });

    test('can get all lunches from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({}, {}, function (lunchesRetrieved) {
            assert.deepEqual(lunchesRetrieved, expectedLunches);
            testDone();
        })
    });

    test('can get all lunches from the database adapter with sort', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({}, {sort: {dateTime: 1}}, function (lunchesRetrieved) {
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
        databaseAdapter.getLunches(filter, {sort: {dateTime: 1}}, function (lunchesRetrieved) {
            assert.equal(lunchesRetrieved.length, 3);
            assert.deepEqual(lunchesRetrieved[0], expectedLunches[4]);
            assert.deepEqual(lunchesRetrieved[1], expectedLunches[3]);
            assert.deepEqual(lunchesRetrieved[2], expectedLunches[1]);
            testDone();
        })
    });
    test('can save a lunch to the DB', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);

        var lunchToSave = {person1: donna, person2: rose, dateTime: new Date(2019, 17, 1), location: digIn}
        databaseAdapter.addLunch(lunchToSave, function () {
            databaseAdapter.getLunches({person1: donna, person2: rose}, {}, function (lunchesRetrieved) {
                assert.equal(lunchesRetrieved.length, 1);
                assert.deepEqual(lunchesRetrieved[0], lunchToSave);
                testDone();
            });
        });
    });
    test('can search lunches from the database adapter', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({person1: rory}, {}, function (lunchesRetrieved) {
            assert.equal(1, lunchesRetrieved.length);
            assert.deepEqual(expectedLunches[1], lunchesRetrieved[0]);

            testDone();
        })
    });
    test('can search lunches from the database adapter with some sub searching', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);
        databaseAdapter.getLunches({"person1.firstName": 'Rory'}, {}, function (lunchesRetrieved) {
            assert.equal(1, lunchesRetrieved.length);
            assert.deepEqual(expectedLunches[1], lunchesRetrieved[0]);

            testDone();
        })
    });
    test('can set location on Lunch', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);

        var location = {name: 'Grey Dog', address: '242 W 16th St', zipCode: '10011'};

        var lunchId = '123412341213';
        var lunchWithoutLocation = {_id: lunchId  ,person1: donna, person2: rose, dateTime: new Date(2019, 17, 1)}
        database.get('lunch').insert(lunchWithoutLocation);

        databaseAdapter.setLunchLocation(lunchWithoutLocation, location, function () {
            databaseAdapter.getLunches({person1: donna, person2: rose}, {}, function (lunchesRetrieved) {
                assert.equal(lunchesRetrieved.length, 1);
                assert.equal(lunchesRetrieved[0]._id.id, lunchId);
                assert.deepEqual(lunchesRetrieved[0].location, location);
                testDone();
            });
        });

    });
    test('can save a location to the DB', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);

        const locationToSave = {name: 'Dead Poet', address: ' 450 Amsterdam Ave #1', zipCode: '10024'};
        databaseAdapter.addLocation(locationToSave, function (error, locationSaved) {
            databaseAdapter.getLocations({name:'Dead Poet'}, {}, function (locationsRetrieved) {
                assert.equal(locationsRetrieved.length, 1);
                assert.deepEqual(locationsRetrieved[0], locationSaved);
                assert.deepEqual(locationToSave, locationSaved);
                testDone();
            });
        });
    });

    test('can save a person to the DB', function (testDone) {
        var databaseAdapter = new DatabaseAdapter(mongoUrl);

        const personToSave = {firstName: 'Martha', lastName: 'Jones', email: 'drjones@gmail.com'};
        databaseAdapter.addPerson(personToSave, function (error, personSaved) {
            databaseAdapter.getPeople({firstName:'Martha'}, {}, function (peopleGotten) {
                assert.equal(peopleGotten.length, 1);
                assert.deepEqual(peopleGotten[0], personSaved);
                assert.deepEqual(personToSave, personSaved);
                testDone();
            });
        });
    });
})