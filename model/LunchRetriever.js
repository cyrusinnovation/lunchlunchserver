/**
 * Created by Cyrus on 4/14/14.
 */
ObjectID = require('mongodb').ObjectID
var LunchRetriever = function (databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
}
LunchRetriever.prototype = {
    getLunchesForPerson: function (person, lunchesReceived) {

        var filter =
        {$or: [
            {"person1._id": new ObjectID(person._id)},
            {"person2._id": new ObjectID(person._id)}
        ]};

        this.databaseAdapter.getLunches(filter, {sort: {dateTime: 1}}, function (allLunches) {
            lunchesReceived(allLunches);
        });


    }
}


module.exports = LunchRetriever;