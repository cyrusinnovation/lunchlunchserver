/**
 * Created by Cyrus on 4/22/14.
 */
var MockDatabaseAdapter = function () {

}
var peopleToReturn,
    lunchesToReturn;
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
    }

};

module.exports = MockDatabaseAdapter;