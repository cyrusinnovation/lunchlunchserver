var assert = require('assert');
var sinon = require('sinon');
var DatabaseAdapter = require('../../model/DatabaseAdapter');
var PersonRetriever = require('../../model/PersonRetriever');
suite('PersonRetrieverTest', function () {

    var batman = {firstName: 'Bruce', lastName: 'Wayen', email: 'iamthenight@gmail.com'};
    var greenLantern = {firstName: 'Hal', lastName: 'Jordan', email: 'highball@ferrisair.com'};

    var allPeopleFound;


    var databaseAdapter = new DatabaseAdapter('localhost/testDb');
    var sinonStub, filterPassedIn,optionsPassedIn;
    setup(function (setupFinished) {
        sinonStub = sinon.stub(databaseAdapter, 'getPeople', function (filter,options,peopleGotten) {
            filterPassedIn = filter;
            optionsPassedIn = options;
            peopleGotten(allPeopleFound);
        });
        setupFinished();
    });

    teardown(function(teardownFinished){
        sinonStub.restore();
        teardownFinished();
    });

    test('will retrieve a person by email', function (testDone) {
        var personRetriever = new PersonRetriever(databaseAdapter);

        allPeopleFound = [batman];
        personRetriever.getPerson('iamthenight@gmail.com', function(personRetrieved){
            assert.equal(batman, personRetrieved);
            assert.deepEqual({},optionsPassedIn);
            assert.deepEqual( filterPassedIn,{email: { $regex :RegExp('^iamthenight@gmail.com$'), $options:'i'}});
            testDone();
        })

    });

    test('will not explode when no people are retrieved', function (testDone) {
        var personRetriever = new PersonRetriever(databaseAdapter);

        allPeopleFound = undefined;
        personRetriever.getPerson('iamthenight@gmail.com', function(personRetrieved){
            assert.equal(undefined, personRetrieved);
            assert.deepEqual({},optionsPassedIn);
            assert.deepEqual( filterPassedIn,{email: { $regex :RegExp('^iamthenight@gmail.com$'), $options:'i'}});
            testDone();
        })

    });


    test('will retrieve somone else by email', function (testDone) {
        var personRetriever = new PersonRetriever(databaseAdapter);
        allPeopleFound = [greenLantern];

        personRetriever.getPerson('Highball@ferrisair.com', function(personRetrieved){
            assert.equal(greenLantern, personRetrieved);
            assert.deepEqual({},optionsPassedIn);
            assert.deepEqual( filterPassedIn,{email: { $regex :new RegExp('^Highball@ferrisair.com$'), $options:'i'}});
            testDone();
        })

    });

    test('will return nothing when person cannot be found', function (testDone) {
        var personRetriever = new PersonRetriever(databaseAdapter);
        allPeopleFound = [];
        personRetriever.getPerson('bornonamonday@swampytimes.com', function(personRetrieved){
            assert.deepEqual( filterPassedIn,{email: { $regex :RegExp('^bornonamonday@swampytimes.com$'), $options:'i'}});
            assert.equal(undefined, personRetrieved);
            assert.deepEqual({},optionsPassedIn);
            testDone();
        })

    });
})