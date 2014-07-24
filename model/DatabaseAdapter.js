/**
 * Created by Cyrus on 4/14/14.
 */
var monk = require('monk');
var DatabaseAdapter = function (databaseUrl) {
    this.databaseUrl = databaseUrl;
    this.database = monk(this.databaseUrl);
    this.peopleCollection = this.database.get('people');
    this.peopleCollection.ensureIndex({'email':1},{unique:true})
    this.lunchCollection = this.database.get('lunch');
    this.locationCollection = this.database.get('location');
};

DatabaseAdapter.prototype = {
    getPeople: function (filter,options, peopleGotten) {
        this.peopleCollection.find(filter, options, function (error, people) {
            peopleGotten(people);
        });
    },
    addPerson: function(person, personSaved){
        this.peopleCollection.insert(person, personSaved);
    },

    getLunches: function (filter,options, lunchesGotten) {
        this.lunchCollection.find(filter,options,function (error, lunches) {
            lunchesGotten(lunches);
        });
    },

    getLocations: function(filter,options,locationsGotten){
        this.locationCollection.find(filter,options, function(error, locations){
            locationsGotten(locations);
        });
    },

    addLocation:function(location, locationSaved){
        this.locationCollection.insert(location, locationSaved);

    },
    addLunch: function (lunch, callback) {
        this.lunchCollection.insert(lunch, callback);
    },

    setLunchLocation: function(lunch, location, callback){
        this.lunchCollection.update({'_id':lunch._id},{$set:{'location': location}}, callback);
    }

};

module.exports = DatabaseAdapter;