/**
 * Created by Cyrus on 4/21/14.
 */
/**
 * Created by Cyrus on 4/15/14.
 */
var LunchBuddyFinder = require('./LunchBuddyFinder');
var LunchRetriever = require('./LunchRetriever');
var LunchCandidateFinder = require('./LunchCandidateFinder');
function LunchBuddyFinderFactory() {
}
LunchBuddyFinderFactory.prototype = {
    buildLunchBuddyFinder: function (databaseAdapter) {
        var lunchCandidateFinder = new LunchCandidateFinder(databaseAdapter, new LunchRetriever(databaseAdapter));
        return new LunchBuddyFinder(lunchCandidateFinder);
    }};
module.exports = LunchBuddyFinderFactory;