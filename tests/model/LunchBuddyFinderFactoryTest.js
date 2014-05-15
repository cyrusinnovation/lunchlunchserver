var assert = require('assert');


var DatabaseAdapter = require('../../model/DatabaseAdapter');
var LunchBuddyFinderFactory = require('../../model/LunchBuddyFinderFactory');
var LunchBuddyFinder = require('../../model/LunchBuddyFinder');
var LunchRetriever = require('../../model/LunchRetriever');
var LunchCandidateFinder = require('../../model/LunchCandidateFinder');
suite('LunchBuddyFinderFactoryTest', function () {

    test("will build a LunchBuddyFinder", function(testDone){
        var factory = new LunchBuddyFinderFactory();
        var databaseAdapter = new DatabaseAdapter("http://localhost/testDB");
        var finderBuilt = factory.buildLunchBuddyFinder(databaseAdapter);
        assert(finderBuilt instanceof LunchBuddyFinder);

        var lunchCandidateFinder = finderBuilt.candidateFinder;
        assert(lunchCandidateFinder instanceof LunchCandidateFinder)
        assert.equal(lunchCandidateFinder.datatabaseAdapter ,databaseAdapter);
        var lunchRetriever = lunchCandidateFinder.lunchRetriever;
        assert(lunchRetriever instanceof LunchRetriever);
        assert.equal(lunchRetriever.databaseAdapter ,databaseAdapter);
        testDone();
    })
})