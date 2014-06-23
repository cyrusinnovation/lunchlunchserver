var assert = require('assert');
var sinon = require('sinon');
var MockResponse = require('./MockResponse')
var locationsRoute = require('../../routes/locations');
var LocationRetriever = require('../../model/LocationRetriever');
suite('LocationsTest', function () {

    var locationsToReturn = [];
    setup(function (setupDone) {
        this.locationsRetriever = new LocationRetriever();
        this.getlocationsStub = sinon.stub(this.locationsRetriever, 'getLocations', function (locationsRetrieved) {
            locationsRetrieved(locationsToReturn);
        });

        setupDone();
    })

    teardown(function (teardownDone) {
        locationsToReturn = [];
        this.getlocationsStub.restore();
        teardownDone();
    })

    test('will return locations from the location retriever', function (testDone) {

        var ahmos= {name: 'Ahmos', address:'2505 Dexter Rd', zipCode:'48103'};
        var cardamom= {name: 'Cardamom', address:'1739 Dexter Rd', zipCode:'48105'};
        var fritas= {name: 'Frita Batidos', address:'117 W Washington St', zipCode:'48104'};


        var route = new locationsRoute.locations(this.locationsRetriever);
        locationsToReturn = [ahmos, cardamom, fritas];


        var request = {query: {}};
        var sendWasCalled = false;
        var mockSend = function (viewData) {
            sendWasCalled = true;
            assert.deepEqual(viewData, locationsToReturn);
        };
        var response = new MockResponse(mockSend);

        route(request, response);

        assert(sendWasCalled);
        testDone();
    });


})