/**
 * Created by Cyrus on 4/14/14.
 */
var monk = require('monk');
var DatabaseAdapter = function (databaseUrl) {
    this.databaseUrl = databaseUrl;
    this.database = monk(this.databaseUrl);


}
DatabaseAdapter.prototype = {

    getPeople: function (peopleGotten) {
        var peopleCollection = this.database.get('people');
        peopleCollection.find({}, function (error, people) {
            peopleGotten(people);
        });
    },

    getLunches: function (lunchesGotten) {
        var lunchCollection = this.database.get('lunch');
        lunchCollection.find({}, function (error, lunches) {
            lunchesGotten(lunches);
        });

    }
};
        module.exports = DatabaseAdapter;