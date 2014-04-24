/**
 * Created by Cyrus on 4/21/14.
 */
ObjectID = require('mongodb').ObjectID
var LunchBuddyFinder = function(databaseAdapter){
    this.databaseAdapter = databaseAdapter;
}
LunchBuddyFinder.prototype = {
    findALunchBuddy: function (personToBuddy, buddyFound) {
        this.databaseAdapter.getPeople({_id:{$ne:new ObjectID(personToBuddy._id)}},{}, function(peopleRetrieved){
            var buddyIndex = Math.floor(Math.random() * peopleRetrieved.length);
            var buddy = peopleRetrieved[buddyIndex];
            buddyFound(buddy);
        });
    }};
module.exports = LunchBuddyFinder;