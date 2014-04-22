/**
 * Created by Cyrus on 4/15/14.
 */
var LunchRetriever = require('./LunchRetriever');
var DatabaseAdapter = require('./DatabaseAdapter')
var config = require('../config');
function LunchRetrieverFactory() {
}
LunchRetrieverFactory.prototype = {
    buildLunchRetriever: function (databaseAdapter) {
        return new LunchRetriever(databaseAdapter);
    }};
module.exports = LunchRetrieverFactory;