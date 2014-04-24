/**
 * Created by Cyrus on 4/14/14.
 */
var monk = require('monk');
var DatabaseAdapter = function (databaseUrl) {
    this.databaseUrl = databaseUrl;
    this.database = monk(this.databaseUrl);
    this.peopleCollection = this.database.get('people');
    this.lunchCollection = this.database.get('lunch');
}
DatabaseAdapter.prototype = {
    getPeople: function (filter,options, peopleGotten) {
        this.peopleCollection.find(filter, options, function (error, people) {
            peopleGotten(people);
        });
    },

    getLunches: function (filter,options, lunchesGotten) {
        this.lunchCollection.find(filter,options,function (error, lunches) {
            lunchesGotten(lunches);
        });
    },

    saveLunch: function (lunch, callback) {
        this.lunchCollection.insert(lunch, callback);
    }
};

module.exports = DatabaseAdapter;