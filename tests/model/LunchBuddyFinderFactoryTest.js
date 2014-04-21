var assert = require('assert');


var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LunchBuddyFinderFactory = require('../../model/LunchBuddyFinderFactory');
var LunchBuddyFinder = require('../../model/LunchBuddyFinder');
suite('LunchBuddyFinderFactoryTest', function () {

    test("will build a LunchBuddyFinder", function(testDone){
        var factory = new LunchBuddyFinderFactory();
        var finderBuilt = factory.buildLunchBuddyFinder();
        assert(finderBuilt instanceof LunchBuddyFinder);
        assert(finderBuilt.databaseAdapter instanceof  DatabaseAdapter);
        assert.equal('localhost:27017/LunchLunchDB', finderBuilt.databaseAdapter.databaseUrl);
        testDone();
    })
})