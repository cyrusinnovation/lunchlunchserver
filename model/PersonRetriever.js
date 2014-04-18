/**
 * Created by Cyrus on 4/14/14.
 */
var PersonRetriever = function (adapter) {
    this.databaseAdapter = adapter;

}
PersonRetriever.prototype = {
    getPerson: function (email, personRetrieved) {
        this.databaseAdapter.getPeople(function (allPeople) {

            var personFound = false;
            allPeople.forEach(function (person) {
                if (person.email.toLowerCase() == email.toLowerCase()) {
                    personFound = true;
                    personRetrieved(person);
                    return;
                }
            })
            if (!personFound) {
                personRetrieved();
            }
        })
    }
}
module.exports = PersonRetriever;