var assert = require('assert');
var LunchCandidateFinder = require('../../model/LunchCandidateFinder');
var LunchBuddyFinder = require('../../model/LunchBuddyFinder');

var sinon = require('sinon');

var sandor = {_id:"123456789012", firstName: 'Sandor', lastName: 'Clegane', email: 'hound@clegane.net'};
var brienne = {_id:"adsfvcscasdg",firstName: 'Brienne', lastName: 'Tarth', email: 'serbriennee@sapphires.com'};
var ned = {_id:"sdjgmbo1293m",firstName: 'Eddard', lastName: 'Stark', email: 'lordned@winterfell.net'};
var arya = {_id:"sdavcsdetfdc",firstName: 'Arya', lastName: 'Stark', email: 'valarmorgulis@winterfell.net'};
var robert = {_id:"123cjvdsvdse",firstName: 'Robert', lastName: 'Baratheon', email: 'rking@kingslanding.com'};


suite('LunchBuddyFinderTest', function () {
    var candidateFinder = new LunchCandidateFinder();
    var sinonStub;
    var allPeopleToFind = [];
    var personPassedIn;
    setup(function (setupFinished) {
        sinonStub = sinon.stub(candidateFinder, 'findAllLunchCandidates', function (person,candidatesFound) {
            personPassedIn= person;
            candidatesFound(allPeopleToFind);
        });
        setupFinished();
    });
    teardown(function (teardownFinished) {
        sinonStub.restore();
        teardownFinished();
    });
    test('Will randomly retrieve another person to be your lunch buddy', sinon.test(function () {
        var finder = new LunchBuddyFinder(candidateFinder);
        this.stub(Math, 'random', function () {
            return 3 / 4;
        });
        allPeopleToFind = [brienne, ned, arya, robert];
        finder.findALunchBuddy(sandor, function (buddyFound) {
            assert.deepEqual(personPassedIn, sandor);
            assert.equal(buddyFound, robert);
        });

    }));

    test('Will randomly retrieve another person to be your lunch buddy: case 2', sinon.test(function () {
        var finder = new LunchBuddyFinder(candidateFinder);
        this.stub(Math, 'random', function () {
            return 1 / 4;
        });
        allPeopleToFind = [ned, arya, robert, sandor];
        finder.findALunchBuddy(brienne, function (buddyFound) {
            assert.deepEqual(personPassedIn, brienne);
            assert.equal(buddyFound, arya);
        });

    }));

})