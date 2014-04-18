var assert = require('assert');
var sinon = require('sinon');
var MockResponse = require('./MockResponse')
var lunchRoute = require('../../routes/lunches');
var LunchRetriever = require('../../model/LunchRetriever');

suite('LunchesTest', function () {
    var personPassedIn= undefined;
    var lunchesToReturn = [];
    setup( function(setupDone){
        this.lunchRetriever = new LunchRetriever();
        this.getLunchesStub = sinon.stub(this.lunchRetriever, 'getLunchesForPerson', function (person, lunchesRetrieved) {
            personPassedIn = person;
            lunchesRetrieved(lunchesToReturn);
        });

        setupDone();
    })

    teardown(function(teardownDone){
        personPassedIn = undefined;
        lunchesToReturn = []
        this.getLunchesStub.restore();
        teardownDone();
    })

    test('will return true if person retriever returns a person of that email', function (testDone) {


        var walter = {firstName: 'Walter', lastName: 'White', email: 'wwhite@albhs.edu'};
        var jesse = {firstName: 'Jess', lastName: 'Pinkman', email: 'thecapn@yahoo.com'};
        var saul = {firstName:'Saul', lastName:'Goodman', email:'bettercall@saul.net'};



        var lunch1 = {person1: walter, person2: jesse, dateTime: new Date(2017, 10, 7)};
        var lunch2 = {person1: saul, person2: walter, dateTime: new Date(2014, 5, 23)};
        var lunch3 = {person1: jesse, person2: saul, dateTime: new Date(2015, 10, 1)};



        var route = new lunchRoute.getLunches(this.lunchRetriever);
        lunchesToReturn =[lunch1, lunch2, lunch3];

        var expectedPersonUsed = {firstName: "Dante", lastName: "Aligieri", email: "da@purgatory.net"};
        var request = {query: {person: JSON.stringify(expectedPersonUsed)}};

        var sendWasCalled = false;
        var mockSend = function (viewData) {
            sendWasCalled = true;
            assert.deepEqual(viewData, lunchesToReturn);
        };
        var response = new MockResponse(mockSend);

        route(request, response);

        assert.deepEqual(personPassedIn, expectedPersonUsed);
        assert(sendWasCalled);
        testDone();
    });


    test('will return nothing if there is not person passed in', function (testDone) {




        var route = new lunchRoute.getLunches(this.lunchRetriever);


        var request = {query: ""};

        var sendWasCalled = false;
        var mockSend = function (viewData) {
            sendWasCalled = true;
            assert.deepEqual(viewData, undefined);
        };
        var response = new MockResponse(mockSend);

        route(request, response);

        assert.deepEqual(personPassedIn, undefined);
        assert(sendWasCalled);
        testDone();
    });


})