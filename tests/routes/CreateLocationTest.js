var assert = require('assert');
var MockResponse = require('./MockResponse')
var createLocation = require('../../routes/createlocation');
var MockDatabaseAdapter = require('../model/MockDatabaseAdapter');
suite('CreateLocationTest', function () {

    var locationSaved;

    setup(function (setupDone) {
        this.databaseAdapter = new MockDatabaseAdapter();

        setupDone();
    })

    teardown(function (teardownDone) {
        locationSaved = undefined;
        teardownDone();
    })

    test('will save location using database adapter', function (testDone) {

        var locationToSave = {name:'Tamarind', address:'99 Hudson St.', zipCode:'10013'}
        var locationToSend = {name:'This is what is returned through the database adapter', address:'99 Hudson St.', zipCode:'10013'}
        this.databaseAdapter.locationToReturn = locationToSend;
        this.databaseAdapter.errorToReturn =null;
        var route = new createLocation.createLocation(this.databaseAdapter)

        var request = {body: {location: locationToSave}};


        var sendWasCalled = false;
        var locationSent = null;
        var mockSend = function (location) {
            locationSent = location;
            sendWasCalled = true;
        };
        var response = new MockResponse(mockSend);

        route(request, response);


        assert(sendWasCalled);

        assert.deepEqual(this.databaseAdapter.locationToSave, locationToSave);

        assert.deepEqual(locationSent, locationToSend);


        testDone();
    });

    test('will save location using database adapter when there is an error will not send back', function (testDone) {

        var locationToSave = {name:'Tamarind', address:'99 Hudson St.', zipCode:'10013'}
        var locationToSend = {name:'This is what is returned through the database adapter', address:'99 Hudson St.', zipCode:'10013'}
        this.databaseAdapter.locationToReturn = locationToSend;
        this.databaseAdapter.errorToReturn ="an error";
        var route = new createLocation.createLocation(this.databaseAdapter)

        var request = {body: {location: locationToSave}};


        var sendWasCalled = false;
        var locationSent = null;
        var mockSend = function (location) {
            locationSent = location;
            sendWasCalled = true;
        };
        var response = new MockResponse(mockSend);

        route(request, response);


        assert(sendWasCalled);

        assert.deepEqual(this.databaseAdapter.locationToSave, locationToSave);

        assert.deepEqual(locationSent, "");


        testDone();
    });
})