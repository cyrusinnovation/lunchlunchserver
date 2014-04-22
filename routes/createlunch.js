/**
 * Created by Cyrus on 4/22/14.
 */
exports.createLunch = function(databaseAdapter){
    var requestHandler = function (request, response) {

//        try {
//            var person = JSON.parse(request.query.person);
//
//            lunchRetriever.getLunchesForPerson(person, function (lunchesRetrieved) {
//                response.send(lunchesRetrieved);
//
//            });
//        } catch (parseException) {
//            response.send();
//        }

        var lunch = JSON.parse(request.body.lunch)
        databaseAdapter.saveLunch(lunch, function(){
            response.send(lunch);
        });

    };
    return requestHandler;
}