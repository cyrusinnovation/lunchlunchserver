var assert = require('assert');
var MockResponse = require('./MockResponse')
var setLunchLocationhRoute = require('../../routes/setlunchlocation');
var MockDatabaseAdapter = require('../model/MockDatabaseAdapter');
ObjectID = require('mongodb').ObjectID

suite('SetLunchLocationTest', function () {

    setup(function (setupDone) {
        this.databaseAdapter = new MockDatabaseAdapter();

        setupDone();
    })

    teardown(function (teardownDone) {
        lunchSaved = undefined;
        teardownDone();
    })

    test('will update lunch id with location', function (testDone) {
        var locationAsSent = {name: 'E\'s Bar', address: '511 Amsterdam Ave', zipCode: '10033', _id: '535568d569b55ca065000002'};
        var lunchToUpdate = {_id: new ObjectID('1ff2f2ac2b23cd123d3d4d4f')};
        var expectedLocation = {name: 'E\'s Bar', address: '511 Amsterdam Ave', zipCode: '10033', _id: new ObjectID('535568d569b55ca065000002')};

        var route = new setLunchLocationhRoute.updateLunch(this.databaseAdapter)

        var request = {body: {lunch: lunchToUpdate, location: locationAsSent}};


        var sendWasCalled = false;
        var lunchSent = null;
        var mockSend = function (lunch) {
            lunchSent = lunch;
            sendWasCalled = true;
        };
        var response = new MockResponse(mockSend);

        route(request, response);


        assert(sendWasCalled);

        assert.deepEqual(this.databaseAdapter.lunchToUpdate, lunchToUpdate);

        assert.deepEqual(this.databaseAdapter.locationForUpdate, expectedLocation);

        testDone();
    });
})