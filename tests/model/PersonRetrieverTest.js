var assert = require('assert');
var sinon = require('sinon');
var DatabaseAdapter = require('../../model/DatabaseAdapter');
var PersonRetriever = require('../../model/PersonRetriever');
suite('PersonRetrieverTest', function () {

    var batman = {firstName: 'Bruce', lastName: 'Wayen', email: 'iamthenight@gmail.com'};
    var superman = {firstName: 'Clark', lastName: 'Kent', email: 'lastson@yahoo.com'};
    var aquaman = {firstName: 'Arthur', lastName: 'Curry', email: 'sevenseas@altavista.com'};
    var greenLantern = {firstName: 'Hal', lastName: 'Jordan', email: 'highball@ferrisair.com'};
    var flash = {firstName: 'Barry', lastName: 'Allen', email: 'ballen@ccpd.com'};

    var allPeople = [batman, superman, aquaman, greenLantern, flash];


    var databaseAdapter = new DatabaseAdapter('localhost/testDb');
    var sinonStub;
    setup(function (setupFinished) {
        sinonStub = sinon.stub(databaseAdapter, 'getPeople', function (peopleGotten) {
            peopleGotten(allPeople);
        });
        setupFinished();
    });

    teardown(function(teardownFinished){
        sinonStub.restore();
        teardownFinished();
    });
    test('will retrieve a person by email', function (testDone) {
        var personRetriever = new PersonRetriever(databaseAdapter);
        personRetriever.getPerson('iamthenight@gmail.com', function(personRetrieved){
            assert.equal(batman, personRetrieved);
            testDone();
        })

    });

    test('will retrieve somone else by email', function (testDone) {
        var personRetriever = new PersonRetriever(databaseAdapter);
        personRetriever.getPerson('highball@ferrisair.com', function(personRetrieved){
            assert.equal(greenLantern, personRetrieved);
            testDone();
        })

    });

    test('will return nothing when person cannot be found', function (testDone) {
        var personRetriever = new PersonRetriever(databaseAdapter);
        personRetriever.getPerson('bornonamonday@swampytimes.com', function(personRetrieved){
            assert.equal(undefined, personRetrieved);
            testDone();
        })

    });
})