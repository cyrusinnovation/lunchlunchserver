var assert = require('assert');
var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LunchRetriever = require('../../model/LunchRetriever');
var LunchCandidateFinder = require('../../model/LunchCandidateFinder');
var sinon = require('sinon');
ObjectID = require('mongodb').ObjectID

var sandor = {_id: new ObjectID("123456789012"), firstName: 'Sandor', lastName: 'Clegane', email: 'hound@clegane.net'};
var brienne = {_id:  new ObjectID("adsfvcscasdg"), firstName: 'Brienne', lastName: 'Tarth', email: 'serbriennee@sapphires.com'};
var ned = {_id:  new ObjectID("sdjgmbo1293m"), firstName: 'Eddard', lastName: 'Stark', email: 'lordned@winterfell.net'};
var arya = {_id:  new ObjectID("sdavcsdetfdc"), firstName: 'Arya', lastName: 'Stark', email: 'valarmorgulis@winterfell.net'};
var robert = {_id:  new ObjectID("123cjvdsvdse"), firstName: 'Robert', lastName: 'Baratheon', email: 'rking@kingslanding.com'};
suite('LunchCandidateFinderTest', function () {

    var databaseAdapter = new DatabaseAdapter('localhost/testDb');

    var lunchRetriever = new LunchRetriever(databaseAdapter);
    var getPeopleStub,getLunchesStub;
    var allPeopleToFind = [];
    var lunchesToFind = [];
    var filterPassedInToGetPeople, optionsPassedInToGetPeople, personPassedToGetLunches;

    setup(function (setupFinished) {
        getPeopleStub = sinon.stub(databaseAdapter, 'getPeople', function (filter, options, peopleGotten) {
            filterPassedInToGetPeople = filter;
            optionsPassedInToGetPeople = options;
            peopleGotten(allPeopleToFind);
        });

        getLunchesStub = sinon.stub(lunchRetriever, 'getLunchesForPerson', function (person, lunchesRetrieved) {
            personPassedToGetLunches  = person;
            lunchesRetrieved(lunchesToFind);
        });
        setupFinished();
    });

    teardown(function (teardownFinished) {
        getPeopleStub.restore();
        getLunchesStub.restore();
        teardownFinished();
    });


    test('Will determine who has had the least lunches with you and retrieve them as lunch buddy candidate ', sinon.test(function () {
        var finder = new LunchCandidateFinder(databaseAdapter, lunchRetriever);
        allPeopleToFind = [brienne, ned, arya, robert];
        var lunch1 = createLunch(sandor, brienne);
        var lunch2 = createLunch(sandor, ned);
        var lunch3 = createLunch(arya, sandor);
        var lunch4 = createLunch(sandor, robert);
        var lunch5 = createLunch(sandor, brienne);
        var lunch6 = createLunch(sandor, arya);
        var lunch7 = createLunch(ned, sandor);

        lunchesToFind = [lunch1, lunch2, lunch3, lunch4, lunch5,lunch6,lunch7];

        var candidatesFoundCalled = false;;
        finder.findAllLunchCandidates(sandor, function (candidatesFound) {
            candidatesFoundCalled = true;
            assert.deepEqual(filterPassedInToGetPeople, {_id: {$ne: new ObjectID(sandor._id)}});
            assert.deepEqual({}, optionsPassedInToGetPeople);

            assert.deepEqual(personPassedToGetLunches,sandor);

            assert.equal(candidatesFound.length, 1);
            assert.equal(candidatesFound[0], robert);
        });
        assert(candidatesFoundCalled);
    }));


    test('Will determine who has had the least lunches with you and retrieve all of them to be a lunch buddy candidate', sinon.test(function () {
        var finder = new LunchCandidateFinder(databaseAdapter, lunchRetriever);
        allPeopleToFind = [brienne, ned, arya, robert];
        var lunch1 = createLunch(arya, sandor);
        var lunch2 = createLunch(sandor, arya);

        lunchesToFind = [lunch1, lunch2];

        var candidatesFoundCalled = false;;
        finder.findAllLunchCandidates(sandor, function (candidatesFound) {
            candidatesFoundCalled = true;
            assert.deepEqual(filterPassedInToGetPeople, {_id: {$ne: new ObjectID(sandor._id)}});
            assert.deepEqual({}, optionsPassedInToGetPeople);

            assert.deepEqual(personPassedToGetLunches,sandor);

            assert.equal(candidatesFound.length, 3);
            assert.equal(candidatesFound[0], brienne);
            assert.equal(candidatesFound[1], ned);
            assert.equal(candidatesFound[2], robert);
        });
        assert(candidatesFoundCalled);
    }));
    function createLunch(person1, person2) {
        return {person1: person1, person2: person2, dateTime: '2017-10-07T20:00:00.000Z'};
    }
})









