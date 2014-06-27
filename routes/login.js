/**
 * Created by Cyrus on 4/14/14.
 */
exports.login = function (personRetriever) {
    var requestHandler = function (request, response) {
        personRetriever.getPerson(request.body.email, function (personFound) {
            return response.send(
                 personFound
            );


        });
    };
    return requestHandler;
};
