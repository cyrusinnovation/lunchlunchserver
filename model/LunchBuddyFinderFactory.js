/**
 * Created by Cyrus on 4/21/14.
 */
/**
 * Created by Cyrus on 4/15/14.
 */
var LunchBuddyFinder = require('./LunchBuddyFinder');

function LunchBuddyFinderFactory() {
}
LunchBuddyFinderFactory.prototype = {
    buildLunchBuddyFinder: function (databaseAdapter) {
        return new LunchBuddyFinder(databaseAdapter);
    }};
module.exports = LunchBuddyFinderFactory;