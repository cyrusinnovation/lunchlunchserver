exports.findBuddy = function (lunchBuddyFinder) {
    var requestHandler = function (request, response) {
        var person = request.body.person;
        lunchBuddyFinder.findALunchBuddy(person, function (buddyFound) {
            return response.send(
                buddyFound
            );
        });
    };
    return requestHandler;
}