/**
 * Created by Cyrus on 6/23/14.
 */
var LocationRetriever = function (adapter) {
    this.databaseAdapter = adapter;

}


LocationRetriever.prototype = {
    getLocations: function (locationsRetrieved) {
        this.databaseAdapter.getLocations({},{sort: {name: 1}}, locationsRetrieved);
    }
}
module.exports = LocationRetriever;