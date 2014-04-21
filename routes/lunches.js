/**
 * Created by Cyrus on 4/15/14.
 */
exports.getLunches = function (lunchRetriever) {
    var requestHandler = function (request, response) {

        try {
            var person = JSON.parse(request.query.person);

            lunchRetriever.getLunchesForPerson(person, function (lunchesRetrieved) {
                response.send(lunchesRetrieved);

            });
        } catch (parseException) {
            response.send();
        }
    };
    return requestHandler;
};
