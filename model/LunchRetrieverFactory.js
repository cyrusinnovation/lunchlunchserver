/**
 * Created by Cyrus on 4/15/14.
 */
var LunchRetriever = require('./LunchRetriever');
var DatabaseAdapter = require('./DatabaseAdapter')
function LunchRetrieverFactory() {
}
LunchRetrieverFactory.prototype = {
    buildLunchRetriever: function () {
        return new LunchRetriever(new DatabaseAdapter('localhost:27017/LunchLunchDB'));
    }};
module.exports = LunchRetrieverFactory;