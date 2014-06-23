/**
 * Created by Cyrus on 6/23/14.
 */
/**
 * Created by Cyrus on 4/15/14.
 */
var LocationRetriever = require('./LocationRetriever');
var DatabaseAdapter = require('./DatabaseAdapter')
function LocationRetrieverFactory() {
}
LocationRetrieverFactory.prototype = {
    buildLocationRetriever: function (databaseAdapter) {
        return new LocationRetriever(databaseAdapter);
    }
};
module.exports = LocationRetrieverFactory;