var assert = require('assert');


var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LunchBuddyFinderFactory = require('../../model/LunchBuddyFinderFactory');
var LunchBuddyFinder = require('../../model/LunchBuddyFinder');
suite('LunchBuddyFinderFactoryTest', function () {

    test("will build a LunchBuddyFinder", function(testDone){
        var factory = new LunchBuddyFinderFactory();
        var databaseAdapter = new DatabaseAdapter("http://localhost/testDB");
        var finderBuilt = factory.buildLunchBuddyFinder(databaseAdapter);
        assert(finderBuilt instanceof LunchBuddyFinder);
        assert.equal(finderBuilt.databaseAdapter,databaseAdapter);
        testDone();
    })
})