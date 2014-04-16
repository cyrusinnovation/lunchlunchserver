var PersonRetriever = require('./PersonRetriever');
var DatabaseAdapter = require('./DatabaseAdapter')
function PersonRetrieverFactory() {
}
PersonRetrieverFactory.prototype = {
    buildPersonRetriever: function () {
        return new PersonRetriever(new DatabaseAdapter('localhost:27017/LunchLunchDB'));
    }};
module.exports = PersonRetrieverFactory;