exports.findBuddy = function (lunchBuddyFinder) {
    var requestHandler = function (request, response) {
        var person = JSON.parse(request.query.person);
        lunchBuddyFinder.findALunchBuddy(person, function (buddyFound) {
            return response.send(
                buddyFound
            );
        });
    };
    return requestHandler;
}