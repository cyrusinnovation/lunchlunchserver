/**
 * Created by Cyrus on 6/25/14.
 */
ObjectID = require('mongodb').ObjectID
exports.createLocation = function(databaseAdapter) {

    var requestHandler = function (request, response) {
        var locationToSave = request.body.location;
        databaseAdapter.saveLocation(locationToSave, function(error, locationSaved){
            response.send(locationSaved);
        });

    };
    return requestHandler;
}