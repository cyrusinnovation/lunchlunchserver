/**
 * Created by Cyrus on 4/14/14.
 */
var LunchRetriever = function (databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
}
LunchRetriever.prototype = {
    getLunchesForPerson: function (person, lunchesReceived) {
        var lunchesForPerson = new Array();
        this.databaseAdapter.getLunches({},function (allLunches) {
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
    return  object1["firstName"] == object2["firstName"] && object1["lastName"]== object2["lastName"] && object1["email"] == object2["email"];
}

module.exports = LunchRetriever;