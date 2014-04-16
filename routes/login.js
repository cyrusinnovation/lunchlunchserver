/**
 * Created by Cyrus on 4/14/14.
 */
exports.login = function (personRetriever) {
    var requestHandler = function (request, response) {
        personRetriever.getPerson(request.query.email, function (personFound) {
            return response.send(
                {personFound: personFound}
            );


        });
    };
    return requestHandler;
};
