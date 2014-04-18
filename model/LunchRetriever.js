/**
 * Created by Cyrus on 4/14/14.
 */
var LunchRetriever = function (databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
}
LunchRetriever.prototype = {
    getLunchesForPerson: function (person, lunchesReceived) {
        var lunchesForPerson = new Array();
        this.databaseAdapter.getLunches(function (allLunches) {
            allLunches.forEach(function (lunch) {
                if (jsonEquals(lunch.person1, person) || jsonEquals(lunch.person2, person)) {
                    lunchesForPerson.push(lunch)
                }
            })

            lunchesReceived(lunchesForPerson);
        });


    }
}

function jsonEquals(object1, object2) {
    
    return  JSON.stringify(object1) === JSON.stringify(object2)
}

module.exports = LunchRetriever;