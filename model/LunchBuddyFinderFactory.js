/**
 * Created by Cyrus on 4/21/14.
 */
/**
 * Created by Cyrus on 4/15/14.
 */
var LunchBuddyFinder = require('./LunchBuddyFinder');
var DatabaseAdapter = require('./DatabaseAdapter');

var config = require('../config');
function LunchBuddyFinderFactory() {
}
LunchBuddyFinderFactory.prototype = {
    buildLunchBuddyFinder: function () {
        return new LunchBuddyFinder(new DatabaseAdapter(config.mongoUrl));
    }};
module.exports = LunchBuddyFinderFactory;