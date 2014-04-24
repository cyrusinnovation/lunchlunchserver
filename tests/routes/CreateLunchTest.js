var assert = require('assert');
var MockResponse = require('./MockResponse')
var createLunchRoute = require('../../routes/createlunch');
var MockDatabaseAdapter = require('../model/MockDatabaseAdapter');
ObjectID = require('mongodb').ObjectID

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
    test('will save lunch from the request using the database adapter and convert its peron id strings to an actual object ids', function (testDone) {
        var billAsSent = {firstName: 'Bill', lastName: 'Preston', email: 'bpreseqsuire@sdhs.edu', _id:'535568d569b55ca065000002'};
        var tedAsSent = {firstName: 'Theodore', lastName: 'Logan', email: 'tlogan@sdhs.edu',_id:'535568d569b55ca065000222'};

        var expectedDateTime = '2018-01-04T05:00:00.000Z';
        var lunchToSave = {person1: billAsSent, person2: tedAsSent, dateTime: expectedDateTime};


        var expectedBill = {firstName: 'Bill', lastName: 'Preston', email: 'bpreseqsuire@sdhs.edu', _id:new ObjectID('535568d569b55ca065000002')};
        var expectedTed = {firstName: 'Theodore', lastName: 'Logan', email: 'tlogan@sdhs.edu',_id: new ObjectID('535568d569b55ca065000222')};

        var route = new createLunchRoute.createLunch(this.databaseAdapter)

        var request = {body: {lunch:lunchToSave}};


        var sendWasCalled = false;
        var lunchSent = null;
        var mockSend = function (lunch) {
            lunchSent = lunch;
            sendWasCalled = true;
        };
        var response = new MockResponse(mockSend);

        route(request, response);



        assert(sendWasCalled);

        assert.deepEqual(this.databaseAdapter.lunchToSave.person1,expectedBill);
        assert.deepEqual(  this.databaseAdapter.lunchToSave.person2,expectedTed);
        assert.deepEqual( this. databaseAdapter.lunchToSave.dateTime,expectedDateTime);


        assert.deepEqual(expectedBill, lunchSent.person1);
        assert.deepEqual(expectedTed,  lunchSent.person2);
        assert.deepEqual(expectedDateTime,lunchSent.dateTime);


        testDone();
    });
})