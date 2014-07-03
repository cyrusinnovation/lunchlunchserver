/**
 * Created by Cyrus on 7/3/14.
 */
exports.createPerson = function(databaseAdapter) {
    var requestHandler = function (request, response) {
     var personToSave = request.body.person;
        databaseAdapter.addPerson(personToSave, function(error, personSaved){
            if(!error) {
                response.send(personSaved);
            }
            else{
                response.send();
            }
        })

    };
    return requestHandler;
}