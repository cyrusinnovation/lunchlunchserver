var assert = require('assert');
var sinon = require('sinon')
var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LunchRetriever = require('../../model/LunchRetriever');
suite('LunchRetrieverTest', function () {


    var billy = {firstName: 'Billy', lastName: 'Pilgrim', email: 'bp@unstuck.net'};
    var kilgore = {firstName: 'Kilgore', lastName: 'Trout', email: 'ktrout@yahoo.com'};
    var fred = {firstName: 'Fred', lastName: 'Rosewater', email: 'frosie@yahoo.com'};
    var malachi = {firstName: 'Malachi', lastName: 'Constant', email: 'mconst@google.com'};
    var winston = {firstName: 'Winston Niles', lastName: 'Rumfoord', email: 'wrum@outlook.com'};


    var lunch1 = {person1: billy, person2: kilgore, dateTime: new Date(2017, 10, 7)};
    var lunch2 = {person1: kilgore, person2: fred, dateTime: new Date(2014, 5, 23)};
    var lunch3 = {person1: fred, person2: billy, dateTime: new Date(2015, 10, 1)};
    var lunch4 = {person1: malachi, person2: kilgore, dateTime: new Date(2019, 12, 7)};
    var lunch5 = {person1: billy, person2: winston, dateTime: new Date(2018, 11, 7)};
    var allLunches = [lunch1, lunch2, lunch3, lunch4, lunch5];


    var databaseAdapter = new DatabaseAdapter('localhost/testDb');
    var sinonStub;
    setup(function (setupFinished) {
         sinonStub = sinon.stub(databaseAdapter, 'getLunches', function (lunchesGotten) {
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
        lunchRetriever.getLunchesForPerson(kilgore, function (lunchesReceived) {
            assert.equal(lunchesReceived.length, 3);
            assert.equal(lunchesReceived[0], lunch1);
            assert.equal(lunchesReceived[1], lunch2);
            assert.equal(lunchesReceived[2], lunch4);
            testDone();
        })
    });


    test('will get all lunches for Billy', function (testDone) {
        var lunchRetriever = new LunchRetriever(databaseAdapter);
        lunchRetriever.getLunchesForPerson(billy, function (lunchesReceived) {
            assert.equal(lunchesReceived.length, 3);
            assert.equal(lunchesReceived[0], lunch1);
            assert.equal(lunchesReceived[1], lunch3);
            assert.equal(lunchesReceived[2], lunch5);
            testDone();
        })
    });
    test('search is based on JSON equality', function (testDone) {
        var lunchRetriever = new LunchRetriever(databaseAdapter);
        var person = {firstName: 'Malachi', lastName: 'Constant', email: 'mconst@google.com'};
        lunchRetriever.getLunchesForPerson(person, function (lunchesReceived) {
            assert.equal(lunchesReceived.length, 1);
            assert.equal(lunchesReceived[0], lunch4);
            testDone();
        })
    });

})

