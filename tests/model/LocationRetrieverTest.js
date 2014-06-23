var assert = require('assert');
var sinon = require('sinon');
var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LocationRetriever = require('../../model/LocationRetriever');
suite('LocationRetrieverTest', function () {

    var allLocationsFound;

    var databaseAdapter = new DatabaseAdapter('localhost/testDb');
    var sinonStub, filterPassedIn,optionsPassedIn;
    setup(function (setupFinished) {
        sinonStub = sinon.stub(databaseAdapter, 'getLocations', function (filter,options,locationsGotten) {
            filterPassedIn = filter;
            optionsPassedIn = options;
            locationsGotten(allLocationsFound);
        });
        setupFinished();
    });

    teardown(function(teardownFinished){
        sinonStub.restore();
        teardownFinished();
    });

    const pacRim = {name: 'Pacific Rim', address:'114 W Liberty St', zipCode:'48104'}
    const jerusalemGarden = {name: 'Jerusalem Garden', address:'307 S 5th Ave', zipCode:'48104'}
    const zingermansRoadhouse = {name: 'Zingerman\'s Roadhouse', address:'2501 Jackson Ave', zipCode:'48103'}
    test('will retrieve all locations', function (testDone) {
        var locationRetriever = new LocationRetriever(databaseAdapter);

        allLocationsFound = [pacRim, jerusalemGarden, zingermansRoadhouse];
        locationRetriever.getLocations(function(locationRetrieved){
            assert.equal(allLocationsFound, locationRetrieved);
            assert.deepEqual({sort: {name: 1}},optionsPassedIn);
            assert.deepEqual( filterPassedIn,{});
            testDone();
        })

    });
})