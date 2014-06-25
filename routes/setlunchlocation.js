/**
 * Created by Cyrus on 6/24/14.
 */
ObjectID = require('mongodb').ObjectID
exports.updateLunch = function(databaseAdapter) {

    function createLocationWithObjectId(location) {
        return {name: location.name, address: location.address, zipCode: location.zipCode, _id: new ObjectID(location._id)};
    }

    var requestHandler = function (request, response) {
        var lunchToUpdate = request.body.lunch;
        var location = createLocationWithObjectId(request.body.location);
        databaseAdapter.setLunchLocation({_id: new ObjectID(lunchToUpdate._id)}, location, function(err, object){

            response.send(lunchToUpdate);
        });

    };
    return requestHandler;
}