/**
 * Created by Cyrus on 4/22/14.
 */
var MockDatabaseAdapter = function () {

}
var peopleToReturn,
    lunchesToReturn, locationToReturn, errorToReturn, personToReturn,personSaveErrorToReturn;
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

    addLunch: function (lunch, callback) {
        this.lunchToSave = lunch;
        callback();
    },
    setLunchLocation: function(lunch, location, callback) {
        this.lunchToUpdate = lunch;
        this.locationForUpdate = location;
        callback();

    },

    addLocation: function(location, callback){
        this.locationToSave = location;
        callback(this.errorToReturn, this.locationToReturn)
    },

    addPerson: function(person,  callback){
        this.personToSave = person;
        callback(this.personSaveErrorToReturn, this.personToReturn);
    }

};

module.exports = MockDatabaseAdapter;