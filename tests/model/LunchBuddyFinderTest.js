var assert = require('assert');
var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LunchBuddyFinder = require('../../model/LunchBuddyFinder');

var sinon = require('sinon');

var sandor = {_id:"2125210f2124", firstName: 'Sandor', lastName: 'Clegane', email: 'hound@clegane.net'};
var brienne = {_id:"5423gfnf",firstName: 'Brienne', lastName: 'Tarth', email: 'serbriennee@sapphires.com'};
var ned = {_id:"ngfdgh23235",firstName: 'Eddard', lastName: 'Stark', email: 'lordned@winterfell.net'};
var arya = {_id:"xct2323xc2",firstName: 'Arya', lastName: 'Stark', email: 'valarmorgulis@winterfell.net'};
var robert = {_id:"52361g3",firstName: 'Robert', lastName: 'Baratheon', email: 'rking@kingslanding.com'};

suite('LunchBuddyFinderTest', function () {
    var databaseAdapter = new DatabaseAdapter('localhost/testDb');
    var sinonStub;
    var allPeopleToFind = [];
    var filterPassedIn;
    setup(function (setupFinished) {
        sinonStub = sinon.stub(databaseAdapter, 'getPeople', function (filter,peopleGotten) {
            filterPassedIn = filter;
            peopleGotten(allPeopleToFind);
        });
        setupFinished();
    });
    teardown(function (teardownFinished) {
        sinonStub.restore();
        teardownFinished();
    });
    test('Will randomly retrieve another person to be your lunch buddy', sinon.test(function () {
        var finder = new LunchBuddyFinder(databaseAdapter);
        this.stub(Math, 'random', function () {
            return 3 / 4;
        });
        allPeopleToFind = [brienne, ned, arya, robert];
        finder.findALunchBuddy(sandor, function (buddyFound) {
            assert.deepEqual(filterPassedIn, {_id:{$ne:sandor._id}});
            assert.equal(buddyFound, robert);
        });

    }));

    test('Will randomly retrieve another person to be your lunch buddy: case 2', sinon.test(function () {
        var finder = new LunchBuddyFinder(databaseAdapter);
        this.stub(Math, 'random', function () {
            return 1 / 4;
        });
        allPeopleToFind = [ned, arya, robert, sandor];
        finder.findALunchBuddy(brienne, function (buddyFound) {
            assert.deepEqual(filterPassedIn, {_id:{$ne:brienne._id}});
            assert.equal(buddyFound, arya);
        });

    }));

})