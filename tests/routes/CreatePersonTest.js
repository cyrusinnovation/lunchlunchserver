var assert = require('assert');
var MockResponse = require('./MockResponse')
var createPerson = require('../../routes/createperson');
var MockDatabaseAdapter = require('../model/MockDatabaseAdapter');
suite('CreatePersonTest', function () {

    var personSaved;

    setup(function (setupDone) {
        this.databaseAdapter = new MockDatabaseAdapter();

        setupDone();
    })

    teardown(function (teardownDone) {
        personSaved = undefined;
        teardownDone();
    })


    test('will save person using database adapter', function (testDone) {

        var person = {firstName: 'Michael', lastName:'Holt', email:'mholt@fairplay.net'};
        var personToSend = {firstName: 'Aftersaving, this is returned', lastName:'dodododobo', email:'and such'};
        this.databaseAdapter.personToReturn = personToSend;
        this.databaseAdapter.personSaveErrorToReturn =null;
        var route = new createPerson.createPerson(this.databaseAdapter)

        var request = {body: {person: person}};


        var sendWasCalled = false;
        var personSent = null;
        var mockSend = function (person) {
            personSent = person;
            sendWasCalled = true;
        };
        var response = new MockResponse(mockSend);

        route(request, response);


        assert(sendWasCalled);

        assert.deepEqual(this.databaseAdapter.personToSave, person);

        assert.deepEqual(personSent, personToSend);


        testDone();
    });

    test('if an error occurs will call send with nothing in it', function (testDone) {

        var person = {firstName: 'Michael', lastName:'Holt', email:'mholt@fairplay.net'};
        var personToSend = {firstName: 'Aftersaving, this is returned', lastName:'dodododobo', email:'and such'};
        this.databaseAdapter.personToReturn = personToSend;
        this.databaseAdapter.personSaveErrorToReturn ="some error";
        var route = new createPerson.createPerson(this.databaseAdapter)

        var request = {body: {person: person}};


        var sendWasCalled = false;
        var personSent = null;
        var mockSend = function (person) {
            personSent = person;
            sendWasCalled = true;
        };
        var response = new MockResponse(mockSend);

        route(request, response);


        assert(sendWasCalled);

        assert.deepEqual(this.databaseAdapter.personToSave, person);

        assert.deepEqual(personSent, undefined);


        testDone();
    });

})