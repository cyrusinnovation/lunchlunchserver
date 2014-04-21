/**
 * Created by Cyrus on 4/14/14.
 */
var monk = require('monk');
var DatabaseAdapter = function (databaseUrl) {
    this.databaseUrl = databaseUrl;
    this.database = monk(this.databaseUrl);


}
DatabaseAdapter.prototype = {

    getPeople: function (filter, peopleGotten) {
        var peopleCollection = this.database.get('people');
        peopleCollection.find(filter, function (error, people) {
            peopleGotten(people);
        });
    },

    getLunches: function (filter, lunchesGotten) {
        var lunchCollection = this.database.get('lunch');
        lunchCollection.find(filter, function (error, lunches) {
            lunchesGotten(lunches);
        });

    }
};

module.exports = DatabaseAdapter;