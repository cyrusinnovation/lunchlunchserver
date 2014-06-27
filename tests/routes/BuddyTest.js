var assert = require('assert');
var sinon = require('sinon');
var MockResponse = require('./MockResponse')
var buddyRoute = require('../../routes/buddy');
var LunchBuddyFinder = require('../../model/LunchBuddyFinder');
suite('BuddyTest', function () {
    var personUsed;
    var buddyToFind;
    setup(function (setupDone) {
        this.buddyFinder = new LunchBuddyFinder();
        this.getBuddyStub = sinon.stub(this.buddyFinder, 'findALunchBuddy', function (person, buddyFound) {
            personUsed = person;
            buddyFound(buddyToFind);
        });
        setupDone();
    })

    teardown(function (teardownDone) {
        personUsed = undefined;
        buddyToFind = undefined;
        this.getBuddyStub.restore();
        teardownDone();
    })


    test('will return buddy fromthe lunch buddy finder, given a person to buddy up', function (testDone) {
        var aquaman = {firstName: 'Arthur', lastName: 'Curry', email: 'seaking@gmail.com'};
        var flash = {firstName: 'Barry', lastName: 'Allen', email: 'ballen@ccpd.gov'};

        var route = new buddyRoute.findBuddy(this.buddyFinder);
        buddyToFind = flash;


        var request = {body: {person: aquaman}};

        var sendWasCalled = false;
        var mockSend = function (viewData) {
            sendWasCalled = true;
            assert.deepEqual(viewData, flash);
        };
        var response = new MockResponse(mockSend);

        route(request, response);

        assert.deepEqual(personUsed, aquaman);
        assert(sendWasCalled);
        testDone();
    });

});

