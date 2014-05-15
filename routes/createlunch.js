/**
 * Created by Cyrus on 4/22/14.
 */
ObjectID = require('mongodb').ObjectID
exports.createLunch = function(databaseAdapter){

    function createPersonWithActualObjectID(person) {
        return {firstName: person.firstName, lastName: person.lastName, email: person.email, _id: new ObjectID(person._id)};
    }

    function convertPeopleIdsToJSON(request) {
        var lunch = request.body.lunch;
        var person1 = createPersonWithActualObjectID(lunch.person1);
        var person2 = createPersonWithActualObjectID(lunch.person2);
        return  {person1: person1, person2: person2, dateTime: lunch.dateTime};
    }

    var requestHandler = function (request, response) {
        var lunchToSave = convertPeopleIdsToJSON(request);
        databaseAdapter.saveLunch(lunchToSave, function(){

            response.send(lunchToSave);
        });

    };
    return requestHandler;
}