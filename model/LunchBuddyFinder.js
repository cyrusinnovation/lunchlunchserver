/**
 * Created by Cyrus on 4/21/14.
 */
ObjectID = require('mongodb').ObjectID
var LunchBuddyFinder = function(candidateFinder){
    this.candidateFinder = candidateFinder;
}
LunchBuddyFinder.prototype = {
    findALunchBuddy: function (personToBuddy, buddyFound) {
        this.candidateFinder.findAllLunchCandidates(personToBuddy, function(peopleRetrieved){
            var buddyIndex = Math.floor(Math.random() * peopleRetrieved.length);
            var buddy = peopleRetrieved[buddyIndex];
            buddyFound(buddy);
        });
    }};
module.exports = LunchBuddyFinder;