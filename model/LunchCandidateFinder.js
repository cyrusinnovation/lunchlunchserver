/**
 * Created by Cyrus on 5/15/14.
 */
ObjectID = require('mongodb').ObjectID
HashMap = require('hashmap').HashMap;

var LunchCandidateFinder = function (adapter, retriever) {
    this.datatabaseAdapter = adapter;
    this.lunchRetriever = retriever;
}

LunchCandidateFinder.prototype = {
    findAllLunchCandidates: function (personToBuddy, candidatesFound) {
        var theLunchRetriever = this.lunchRetriever;
        this.datatabaseAdapter.getPeople({_id: {$ne: new ObjectID(personToBuddy._id)}}, {}, function (allOtherPeople) {
            theLunchRetriever.getLunchesForPerson(personToBuddy, function (lunchesReceived) {
                var buddyToLunchCount = countNumberOfLunchesPerPerson(lunchesReceived, allOtherPeople);
                var found = findBuddiesWithLeastLunches(buddyToLunchCount);
                candidatesFound(found);
            })


            function findBuddiesWithLeastLunches(buddyToLunchCount) {
                var found  =[];
                var minimumNumberOfLunches = Number.MAX_VALUE;
                buddyToLunchCount.keys().forEach(function(person){
                    var lunchesForPerson = buddyToLunchCount.get(person);
                    if(lunchesForPerson < minimumNumberOfLunches){
                        found = [person];
                        minimumNumberOfLunches = lunchesForPerson;
                    }
                    else if(lunchesForPerson == minimumNumberOfLunches){
                        found.push(person);
                    }
                });
                return found;
            }

            function lunchInvolvedPerson(lunch, person) {
                var personIdAsObjectId = person._id;
                return lunch.person1._id == personIdAsObjectId || lunch.person2._id == personIdAsObjectId;
            }

            function countNumberOfLunchesPerPerson(lunchesReceived, allOtherPeople) {
                var peopleToLunchCount = new HashMap();
                allOtherPeople.forEach(function (person) {
                    var lunchCount = 0;
                    lunchesReceived.forEach(function (lunch) {
                        if (lunchInvolvedPerson(lunch, person)) {
                            lunchCount++;
                        }
                    });
                    peopleToLunchCount.set(person, lunchCount);
                });
                return peopleToLunchCount;
            }
        });

    }};
module.exports = LunchCandidateFinder;