var assert = require('assert');
var sinon = require('sinon');
var MockResponse = require('./MockResponse')
var loginRoute = require('../../routes/login');
var PersonRetriever = require('../../model/PersonRetriever');
suite('LoginTest', function () {
    var emailUsed;
    var personToFind;
    setup( function(setupDone){
        this.personRetriever = new PersonRetriever();
        this.getLunchesStub = sinon.stub(this.personRetriever, 'getPerson', function (email, personRetrieved) {
            emailUsed = email;
            personRetrieved(personToFind);
        });

        setupDone();
    })

    teardown(function(teardownDone){
        personToFind = undefined;
        emailUsed = undefined;
        this.getLunchesStub.restore();
        teardownDone();
    })

    test('will return true if person retriever returns a person of that email', function (testDone) {
        var route = new loginRoute.login(this.personRetriever);
        personToFind = {firstName: 'Joe', lastName: 'Bapho', email: 'emailmcgee'};

        var expectedEmail = 'emailmclure';
        var request = {query: {email: expectedEmail}};

        var sendWasCalled = false;;
        var mockSend = function (viewData) {
            sendWasCalled = true;
            assert.deepEqual(viewData, personToFind);
        };
        var response = new MockResponse(mockSend);


        route(request, response);

        assert(sendWasCalled);
        assert.equal(emailUsed, expectedEmail);

        testDone();
    });

    test('will return nothing if person retriever cannot find said person', function (testDone) {

        var route = new loginRoute.login(this.personRetriever);

        var expectedEmail = 'emailmcgee';
        var request = { query: {email: expectedEmail}};
        var sendWasCalled= false;;
        var send = function (viewData) {
            sendWasCalled = true;
            assert.deepEqual(viewData, undefined)
        };
        var response = new MockResponse(send);

        personToFind = undefined;
        route(request, response);

        assert.equal(emailUsed, expectedEmail);

        testDone();
    });


    test('will return nothing there is no email', function (testDone) {
        var route = new loginRoute.login(this.personRetriever);

        var request = { query: {speemail: ""}};
        var sendWasCalled= false;;
        var send = function (viewData) {
            sendWasCalled = true;
            assert.deepEqual(viewData, undefined)
        };
        var response = new MockResponse(send);

        route(request, response);
        testDone();
    });



})