var PersonRetriever = require('./PersonRetriever');

function PersonRetrieverFactory() {
}
PersonRetrieverFactory.prototype = {
    buildPersonRetriever: function (databaseAdapter) {
        return new PersonRetriever(databaseAdapter);
    }};
module.exports = PersonRetrieverFactory;