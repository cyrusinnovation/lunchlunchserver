/**
 * Created by Cyrus on 6/23/14.
 */
exports.locations = function (locationRetriever) {
    var requestHandler = function (request, response) {
        locationRetriever.getLocations(function (locationsFound) {
            return response.send(
                locationsFound
            );


        });
    };
    return requestHandler;
}