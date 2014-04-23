var assert = require('assert');
var sinon = require('sinon');
var MockResponse = require('./MockResponse')
var createLunchRoute = require('../../routes/createlunch');
var MockDatabaseAdapter = require('../model/MockDatabaseAdapter');

suite('CreateLunchTest', function () {
    var lunchSaved;

    setup(function (setupDone) {
        this.databaseAdapter = new MockDatabaseAdapter();


        setupDone();
    })

    teardown(function (teardownDone) {
        lunchSaved = undefined;
        teardownDone();
    })

    test('will save lunch from the request using the database adapter', function (testDone) {
        var bill = {firstName: 'Bill', lastName: 'Preston', email: 'bpreseqsuire@sdhs.edu', _id:'535568d569b55ca065000002'};
        var ted = {firstName: 'Theodore', lastName: 'Logan', email: 'tlogan@sdhs.edu',_id:'535568d569b55ca065000222'};

        var expectedLunch = {person1: bill, person2: ted, dateTime: '2018-01-04T05:00:00.000Z'};

        var route = new createLunchRoute.createLunch(this.databaseAdapter, function () {
            assert.deepEqual(expectedLunch, databaseAdapter.lunchToSave);
        });

        var request = {body: {lunch:expectedLunch}};


        var sendWasCalled = false;
        var lunchSent = null;
        var mockSend = function (lunch) {
            lunchSent = lunch;
            sendWasCalled = true;
        };
        var response = new MockResponse(mockSend);

        route(request, response);

        assert(sendWasCalled);
        assert.deepEqual(lunchSent, expectedLunch);
        testDone();
    });

})