var assert = require('assert');
var sinon = require('sinon')
var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LunchRetriever = require('../../model/LunchRetriever');
suite('LunchRetrieverTest', function () {


    var billy = {firstName: 'Billy', lastName: 'Pilgrim', email: 'bp@unstuck.net', _id:'12345678966'};
    var kilgore = {firstName: 'Kilgore', lastName: 'Trout', email: 'ktrout@yahoo.com', _id:'123456789012'};
    var fred = {firstName: 'Fred', lastName: 'Rosewater', email: 'frosie@yahoo.com', _id:'123456789i8'};
    var malachi = {firstName: 'Malachi', lastName: 'Constant', email: 'mconst@google.com', _id:'1234567890fs'};
    var winston = {firstName: 'Winston Niles', lastName: 'Rumfoord', email: 'wrum@outlook.com', _id:'1253d6789012'};


    var lunch1 = {person1: billy, person2: kilgore, dateTime: new Date(2017, 10, 7)};
    var lunch2 = {person1: kilgore, person2: fred, dateTime: new Date(2014, 5, 23)};
    var lunch3 = {person1: fred, person2: billy, dateTime: new Date(2015, 10, 1)};
    var lunch4 = {person1: malachi, person2: kilgore, dateTime: new Date(2019, 12, 7)};
    var lunch5 = {person1: billy, person2: winston, dateTime: new Date(2018, 11, 7)};
    var allLunches = [lunch1, lunch2, lunch3, lunch4, lunch5];


    var databaseAdapter = new DatabaseAdapter('localhost/testDb');
    var sinonStub;
    var filterPassedIn;
    var optionsPassedIn;
    setup(function (setupFinished) {
         sinonStub = sinon.stub(databaseAdapter, 'getLunches', function (filter,options, lunchesGotten) {
             filterPassedIn = filter;
             optionsPassedIn = options;
            lunchesGotten(allLunches);
        });
        setupFinished();
    });

    teardown(function(teardownFinished){
        sinonStub.restore();
        teardownFinished();
    });

    test('will get all lunches for a person', function (testDone) {
        var lunchRetriever = new LunchRetriever(databaseAdapter);
        var expectedFilter = {$or: [
            {"person1._id": new ObjectID(kilgore._id)},
            {"person2._id": new ObjectID(kilgore._id)}
        ]};
        var expectedOptions = {sort:{dateTime:1}};
        lunchRetriever.getLunchesForPerson(kilgore, function (lunchesReceived) {


            assert.equal(allLunches,lunchesReceived);

            assert.deepEqual(filterPassedIn, expectedFilter);
            assert.deepEqual(optionsPassedIn, expectedOptions);
            testDone();
        })

    });



})

