/**
 * Created by Cyrus on 4/22/14.
 */
var MockDatabaseAdapter = function () {

}
var peopleToReturn,
    lunchesToReturn, locationToReturn;
MockDatabaseAdapter.prototype = {

    getPeople: function (filter, peopleGotten) {
        this.filterPassedToGetPeople = filter;
        peopleGotten(peopleToReturn);
    },

    setPeopleToReturn: function (people) {
        peopleToReturn = people
    },

    getLunches: function (filter, lunchesGotten) {
        this.filterPassedToGetLunches = filter;
        lunchesGotten(lunchesToReturn);
    },

    setLunchesToReturn: function (lunch) {
        lunchesToReturn = lunch
    },

    saveLunch: function (lunch, callback) {
        this.lunchToSave = lunch;
        callback();
    },
    setLunchLocation: function(lunch, location, callback) {
        this.lunchToUpdate = lunch;
        this.locationForUpdate = location;
        callback();

    },

    saveLocation: function(location, callback){
        this.locationToSave = location;
        callback(null, this.locationToReturn)
    }

};

module.exports = MockDatabaseAdapter;