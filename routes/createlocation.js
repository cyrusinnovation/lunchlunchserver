/**
 * Created by Cyrus on 6/25/14.
 */
exports.createLocation = function(databaseAdapter) {

    var requestHandler = function (request, response) {
        var locationToSave = request.body.location;
        databaseAdapter.addLocation(locationToSave, function(error, locationSaved){
            if(!error) {
                response.send(locationSaved);
            }
            else{
                response.send();
            }
        });

    };
    return requestHandler;
}