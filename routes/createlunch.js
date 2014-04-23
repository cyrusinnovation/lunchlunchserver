/**
 * Created by Cyrus on 4/22/14.
 */
exports.createLunch = function(databaseAdapter){
    var requestHandler = function (request, response) {

        databaseAdapter.saveLunch(request.body.lunch, function(){
            response.send(request.body.lunch);
        });

    };
    return requestHandler;
}